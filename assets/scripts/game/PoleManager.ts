import { _decorator, Component, Node, BoxColliderComponent, ITriggerEvent, Vec3 } from 'cc';
import { Constants } from '../data/Constants';
import { CustomEventListener } from '../data/CustomEventListener';
const { ccclass, property } = _decorator;

@ccclass('PoleManager')
export class PoleManager extends Component {
    private length: number = 0;
    private poleCollider: BoxColliderComponent = null;

    onLoad() {
        this.poleCollider = this.node.getComponent(BoxColliderComponent);
        this.poleCollider.on('onTriggerEnter', this.onHit, this);
        this.poleCollider.setGroup(Constants.Group.POLE);
        this.poleCollider.setMask(Constants.Group.CUT + Constants.Group.COIN + Constants.Group.RAIL + Constants.Group.PLANE);
        console.log(this.poleCollider.getGroup(), this.poleCollider.getMask())
        CustomEventListener.on(Constants.PlayerCollisionName.POLE_COLLECT, this.hitPole, this);
    }jj
    onHit (e: ITriggerEvent) {
        console.log('sssssssssssssss')
        if (e.otherCollider.node.name.match('Coin')) {
            this.hitCoin(e)
        }
        if (e.otherCollider.node.name.match('GroundPole')) {
            this.hitRail(e)
        }
    }
    hitCoin (e: ITriggerEvent) {
        e.otherCollider.node.active = false;
    }
    hitCut () {
        // Your initialization goes here.
    }
    hitRail (e: ITriggerEvent) {
        // 停止纵向运动
        CustomEventListener.dispatchEvent(Constants.PoleCollisionName.RAIL)
    }
    hitPole () {
        const scale = this.node.getScale();
        scale.x += 0.5;
        this.node.setScale(new Vec3(scale));
    }
    fly() {}

}
