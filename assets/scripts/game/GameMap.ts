import { _decorator, Component, Node } from 'cc';
import { RoadPoint } from '../mapData/RoadPoint';
const { ccclass, property } = _decorator;

@ccclass('GameMap')
export class GameMap extends Component {
    @property({
        type: RoadPoint
    })
    roadPoint = null;
    @property({
        type: [Node]
    })
    path: Node[] = []

    public maxProgress = 3;
}
