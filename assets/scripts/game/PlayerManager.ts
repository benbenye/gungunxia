import { _decorator, Component, Node, find, SkeletalAnimation, Vec3 } from 'cc';
import { Constants } from '../data/Constants';
import { CustomEventListener } from '../data/CustomEventListener';
const { ccclass, property } = _decorator;

@ccclass('PlayerManager')
export class PlayerManager extends Component {
    @property({
        type: Node
    })
    player = null;
    private playerAnim: SkeletalAnimation = null
    private pole: Node = null

    onLoad() {
        this.playerAnim = this.player.getChildByName('bigvegas@Scary Clown Idle').getComponent(SkeletalAnimation);
        this.pole = this.player.getChildByName('Pole');
        this.pole.setPosition(new Vec3(0, 1.196, -0.423))
        this.playerAnim.play();
        CustomEventListener.on(Constants.PlayerState.RUNNING, this.running, this)
        CustomEventListener.on(Constants.PlayerState.JUMP, this.hang, this)
        CustomEventListener.on(Constants.PlayerState.IDLE, this.idle, this)
    }
    running() {
        this.playerAnim.play('Running');
        this.pole.setPosition(new Vec3(0, 1.196, -0.423))
    }
    idle() {
        this.playerAnim.play();
        this.pole.setPosition(new Vec3(0, 1.196, -0.423))
    }
    hang() {
        this.playerAnim.play('Hanging Idle');
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
