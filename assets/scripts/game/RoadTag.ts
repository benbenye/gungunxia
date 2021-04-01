import { _decorator, Component, Node, Enum, BoxColliderComponent, CylinderColliderComponent } from 'cc';
import { Constants } from '../data/Constants';
const { ccclass, property } = _decorator;


Enum(Constants.Group);

@ccclass('RoadTag')
export class RoadTag extends Component {
    @property({
        type: Constants.Group
    })
    tagName = Constants.Group.COIN;
    onLoad() {
        console.log(this.node)
        // if (this.tagName === Constants.Group.RAIL) {
        //     this.node.getComponent(CylinderColliderComponent).setGroup(this.tagName);
        //     return;
        // }
        this.node.getComponent(BoxColliderComponent).setGroup(this.tagName);
    }
}
