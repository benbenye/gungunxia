import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
const { ccclass, property } = _decorator;

// 节点池

@ccclass('PoolManager')
export class PoolManager {
    public static handle = new Map<string, Node[]>();

    public static getNode(prefab: Prefab, parent: Node) {
        const name = prefab.name;

        if (this.handle.has(name)) {
            return this.handle.get(name).pop();
        }
        const node = instantiate(prefab) as Node;
        node.setParent(parent);
        return node;
    }

    public static setNode(target: Node) {
        const name = target.name;

        if (this.handle.has(name)) {
            this.handle.get(name).push(target);
            return
        }
        this.handle.set(name, [target]);
    }
}
