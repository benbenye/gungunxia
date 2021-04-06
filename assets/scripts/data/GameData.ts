import { _decorator, Component, Node, Enum } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RunTimeData')
export class RunTimeData {
    static _instance: RunTimeData = null;

    public static instance() {
        if (!this._instance) {
            this._instance = new RunTimeData();
        }
        return this._instance;
    }

    public currProgress = 0;
    public maxProgress = 0;
    public speedX = 0;
    public accelerationY = -0.005;
    public speedY = 0;
    public maxSpeedY = -0.1;
    public speedZ = -0.13;
}
