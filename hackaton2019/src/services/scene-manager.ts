import { Scene, Object3D } from 'three';
import { GameObject } from '@/game/game-object';

export class SceneManager {
    public scene: Scene;
    public inSceneGameObjects: InSceneGameObject[] = [];
    public get gameObjects(): GameObject[] {
        return this.inSceneGameObjects.map(x => x.gameObject);
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

    public addGameObject<T extends GameObject>(name: string, gameObject: T, skipInit?: boolean): T {
        this.inSceneGameObjects.push({ name, gameObject });
        if (!skipInit) {
            gameObject.init(this.scene);
        }
        return gameObject;
    }

    public update(): void {
        for (const go of this.inSceneGameObjects.filter(x => x.gameObject.enabled)) {
            go.gameObject.update();
        }
    }

    public destroy(name: string, skipDestroy?: boolean): void {
        let toRemove = this.inSceneGameObjects.filter(x => x.name === name);
        if (!skipDestroy) {
            for (const go of toRemove) {
                go.gameObject.destroy();
            }
        }
        this.inSceneGameObjects = this.inSceneGameObjects.filter(x => x.name !== name);
    }
}

interface InSceneGameObject {
    name: string;
    gameObject: GameObject;
}

export default new SceneManager();