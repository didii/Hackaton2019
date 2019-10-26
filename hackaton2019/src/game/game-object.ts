import { Scene } from 'three';

export class GameObject {
    public enabled: boolean = true;
    public init(scene: Scene): void { }
    public update(): void { }
    public destroy(): void { }
}