import { _decorator, Component, Node, BoxColliderComponent, ITriggerEvent } from 'cc';
import { Constants } from '../data/Constants';
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
    }jj
    onHit (e: ITriggerEvent) {
        console.log('sssssssssssssss')
    }
    hitCoin () {
        // Your initialization goes here.r
    }
    hitCut () {
        // Your initialization goes here.
    }
    hitRail () {}
    hitPole () {}
    fly() {}

}
