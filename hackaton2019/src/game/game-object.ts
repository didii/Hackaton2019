import { Scene } from 'three';

export interface GameObject {
    init(scene: Scene): void;
    update(): void;
}