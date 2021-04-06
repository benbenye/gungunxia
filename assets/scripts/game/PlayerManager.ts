import { _decorator, Component, Node, find, SkeletalAnimation, Vec3, RigidBody, ERigidBodyType, ConstantForce } from 'cc';
import { Constants } from '../data/Constants';
import { CustomEventListener } from '../data/CustomEventListener';
const { ccclass, property } = _decorator;

@ccclass('PlayerManager')
export class PlayerManager extends Component {
    @property({
        type: Node
    })
    player: Node = null;
    private playerAnim: SkeletalAnimation = null
    private pole: Node = null;
    private playerBody: RigidBody = null;
    private playerConstantForce: ConstantForce = null;

    onLoad() {
        this.playerAnim = this.player.getChildByName('role').getComponent(SkeletalAnimation);
        this.playerBody = this.player.getComponent(RigidBody);
        this.playerConstantForce = this.player.getComponent(ConstantForce);
        this.pole = this.player.getChildByName('Pole');
        this.pole.setPosition(new Vec3(0, 1.196, -0.423))
        this.playerAnim.play();
        CustomEventListener.on(Constants.PlayerState.RUNNING, this.running, this)
        CustomEventListener.on(Constants.PlayerState.JUMP, this.hang, this)
        CustomEventListener.on(Constants.PlayerState.IDLE, this.idle, this)
    }

    running() {
        this.playerAnim.play('Running');
        // this.playerConstantForce.enabled = true;
        // this.playerBody.applyImpulse(new Vec3(0, 0, -10))
        // this.playerBody.useGravity = false;
        // this.playerBody.applyForce(new Vec3(0, 0, -430));
        this.playerBody.setLinearVelocity(new Vec3(0, 0, -30));
        this.pole.setPosition(new Vec3(0, 1.196, -0.423))
    }
    idle() {
        this.playerAnim.play();
        // this.playerBody.applyForce(new Vec3(0, -300, 0));
        this.pole.setPosition(new Vec3(0, 1.196, -0.423))
    }
    hang() {
        console.log('hang')
        this.playerAnim.play('Hanging Idle');
        // this.playerBody.useGravity = true;
        // this.playerBody.applyForce(new Vec3(0, -400, -430));
        this.pole.setPosition(new Vec3(0, 2.316, -0.028))
    }

    jump() {}
    
    dropDie() {
        this.playerAnim.play('die');
    }
    poisonDie() {

    }
    cutDie() {}

    winning() {}
    fail() {}

}
