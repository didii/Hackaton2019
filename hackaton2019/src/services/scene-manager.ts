import { Scene, Object3D, Vector3 } from 'three';
import { GameObject } from '@/game/game-object';

export class SceneManager {
    public scene: Scene;
    public inSceneGameObjects: {[key: string]: GameObject} = {};
    public get gameObjects(): GameObject[] {
        return Object.values(this.inSceneGameObjects);
    }

    constructor(scene?: Scene) {
        if (!scene) {
            scene = new Scene();
        }
        this.scene = scene;
    }

    public addObject<T extends Object3D>(obj: T): T {
        this.scene.add(obj);
        return obj;
    }

    public addGameObject<T extends GameObject>(name: string, gameObject: T, position?: Vector3, skipInit?: boolean): T {
        if (position) {
            gameObject.position.set(position.x, position.y, position.z);
        }
        this.inSceneGameObjects[name] = gameObject;
        if (!skipInit) {
            gameObject.init(this.scene);
        }
        return gameObject;
    }

    public update(timeDelta: number): void {
        for (const key of Object.keys(this.inSceneGameObjects)) {
            this.inSceneGameObjects[key].update(timeDelta);
        }
    }

    public destroy(name: string, skipDestroy?: boolean): void {
        const obj = this.inSceneGameObjects[name];
        if (!skipDestroy) {
            obj.destroy();
        }
        delete this.inSceneGameObjects[name];
    }

    public clear() {
        while (this.scene.children.length > 0) {
            this.scene.remove(this.scene.children[0]);
        }
        this.inSceneGameObjects = {};
    }

    public findInSphere(center: Vector3, radius: number): Object3D[] {
        return this.scene.children.filter(x => {
            const pos = x.position.clone();
            const length = pos.addScaledVector(center, -1).length();
            return length <= radius;
        })
    }
}

interface InSceneGameObject {
    name: string;
    gameObject: GameObject;
}

const sceneManager = new SceneManager();

if (module.hot) {
    sceneManager.clear();
}

export default sceneManager;