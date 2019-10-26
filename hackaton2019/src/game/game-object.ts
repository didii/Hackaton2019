import { Scene, Object3D } from 'three';

export class GameObject extends Object3D {
    public enabled: boolean = true;
    public init(scene?: Scene): void { }
    public update(timeDelta: number): void { }
    public destroy(): void { }
}