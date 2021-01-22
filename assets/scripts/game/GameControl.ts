import { _decorator, Component, Node, UIModelComponent, EventTouch, Vec3, Camera, find, CanvasComponent, PhysicsSystem, RigidBodyComponent, BoxColliderComponent, Collider, ITriggerEvent } from 'cc';
import { AudioManager } from './AudioManager';
import { Constants } from '../data/Constants';
import { CustomEventListener } from '../data/CustomEventListener';
import { UIManager } from '../UI/UIManager';
import { RunTimeData } from '../data/GameData';
import { PlayerManager } from './PlayerManager';
const { ccclass, property } = _decorator;

@ccclass('GameControl')
export class GameControl extends Component {
    private gameState = Constants.GameState.IDLE;
    private player: Node = null;
    private camera: Camera = null;
    private playerManager = null;
    private uiCamera = null;
    private secondaryWorldPos: Vec3 = new Vec3(0, 0, 0);
    private canvasNode: Node = null;
    private _runTimeData: RunTimeData = null;
    private playerBox: Collider = null
    onLoad () {
        this._reset();
    }

    start () {
        this._runTimeData = RunTimeData.instance();
        this.canvasNode = find('Canvas');
        this.gameState = Constants.GameState.IDLE;
        this.playerManager = find('playerManager');
        this.player = this.playerManager.getChildByName('player');
        // this.player = PlayerManager.player
        console.log(this.player)
        this.camera = find('Main Camera').getComponent(Camera);

        this.playerBox = this.player.getComponent(Collider);
        this.uiCamera = this.canvasNode.getComponent(CanvasComponent).camera;
        // UIManager.showDialog(Constants.UIPage.mainUI);
        this.canvasNode.on(Node.EventType.TOUCH_START, this._touchStart, this)
        this.canvasNode.on(Node.EventType.TOUCH_MOVE, this._touchMove, this)
        this.canvasNode.on(Node.EventType.TOUCH_END, this._touchEnd, this)
        CustomEventListener.on(Constants.EventName.GAME_START, this._gameStart, this)
        CustomEventListener.on(Constants.EventName.GAME_OVER, this._gameOver, this)
        CustomEventListener.on(Constants.EventName.NEW_LEVEL, this._newLevel, this)

        // AudioManager.playMusic(Constants.AudioSource.BACKGROUND)
        this.playerBox.on('onTriggerEnter', this.aa, this)
        this.playerBox.on('onTriggerStay', this.cc, this)
        this.playerBox.on('onTriggerExit', this.bb, this)
        this.playerManager.getChildByName('Secondary').getComponent(BoxColliderComponent).setGroup(Constants.Group.SECONDARY)
        this.playerBox.setGroup(Constants.Group.PLAYER)
        this.playerBox.setMask(Constants.Group.PLANE + Constants.Group.CUT + Constants.Group.POISON + Constants.Group.POLE_COLLECT)
        console.log(this.playerBox.getGroup(), this.playerBox.getMask())
    }
    cc(e: ITriggerEvent) {
        console.log(`stay: ${e.otherCollider.name}`)
    }
    aa(e: ITriggerEvent) {
        console.log(`enter: ${e.otherCollider.name}`)
        if (this.gameState === Constants.GameState.PLAYING) {
            if (e.otherCollider.node.name.match('Coin')) {
                console.log('get coin')
                return;
            }
            // if (Vec3.distance(this.player.getWorldPosition(), e.otherCollider.))
            CustomEventListener.dispatchEvent(Constants.PlayerState.RUNNING);
            this._runTimeData.accelerationY = 0;
        }
    }
    bb(e: ITriggerEvent) {
        console.log(`exit: ${e.otherCollider.name}`)
        if (!e.otherCollider.node.name.match('Ground')) {
            return
        }
        CustomEventListener.dispatchEvent(Constants.PlayerState.JUMP);
        this._runTimeData.accelerationY = -10;
    }
    update(dt) {
        if (this.gameState !== Constants.GameState.PLAYING) return;
        const wp = this.playerManager.getWorldPosition();
        const cameraWp = find('Main Camera').getWorldPosition();
        if (cameraWp.z < -300) {
            this._gameOver();
            return;
        };
        wp.y += this._runTimeData.accelerationY * dt;
        wp.z += this._runTimeData.speedZ * dt;
        cameraWp.y += this._runTimeData.accelerationY * dt;
        cameraWp.z += this._runTimeData.speedZ * dt;
        this.playerManager.setWorldPosition(wp)
        find('Main Camera').setWorldPosition(cameraWp)
    }

    _touchEnd () {
        console.log('touch end')
    }

    _touchStart(e: EventTouch) {
        this.gameState = Constants.GameState.PLAYING;
        CustomEventListener.dispatchEvent(Constants.PlayerState.RUNNING);
        // this.player = this.canvasNode.getChildByName('Sprite');
    }
    _touchMove(e: EventTouch) {
        this.gameState = Constants.GameState.PLAYING;
        const nowPos = e.getLocation();
        const nowOffset = e.getDelta();
        const beforePos = {x: nowPos.x - nowOffset.x, y: nowPos.y - nowOffset.y};
        const beforeRay = this.camera.screenPointToRay(beforePos.x, beforePos.y);
        if (PhysicsSystem.instance.raycastClosest(beforeRay)) {
            const beforeRayX = PhysicsSystem.instance.raycastClosestResult.hitPoint.x;
            const ray = this.camera.screenPointToRay(e.getLocation().x, e.getLocation().y);
            if (PhysicsSystem.instance.raycastClosest(ray)) {
                const position = PhysicsSystem.instance.raycastClosestResult.hitPoint;
                const wp = this.playerManager.getWorldPosition();
                wp.x = this.playerManager.getWorldPosition().x  + (position.x - beforeRayX);
                if (wp.x > 3.5) wp.x = 3.5
                if (wp.x < -3.5) wp.x = -3.5;
                this.playerManager.setWorldPosition(wp);
            }
        }
    }

    getBeforeRayRes() {

    }

    private _gameStart() {
        UIManager.hideDialog(Constants.UIPage.mainUI);
        UIManager.showDialog(Constants.UIPage.gameUI);
    }
    private _gameOver() {
        // UIManager.hideDialog(Constants.UIPage.gameUI);
        // UIManager.showDialog(Constants.UIPage.resultUI);
        this.gameState = Constants.GameState.OVER;
        CustomEventListener.dispatchEvent(Constants.PlayerState.IDLE)
    }
    private _newLevel() {
        UIManager.hideDialog(Constants.UIPage.resultUI);
        UIManager.showDialog(Constants.UIPage.mainUI);
        this._reset();
    }

    private _reset() {
        // this.mapManager.resetMap();
        // RunTimeData.instance().maxProgress = this.mapManager.maxProgress;
        RunTimeData.instance().currProgress = 0;
    }
}
