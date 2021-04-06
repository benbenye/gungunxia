import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RoadPoint')
export class RoadPoint extends Component {
    @property({
        type: Node,
        displayOrder: 1
    })
    startPoint = null;

    @property({
        type: Node,
        displayOrder: 2
    })
    overPoint = null;
}
