import { Camera, PerspectiveCamera, Vector3 } from 'three';
import { GameObject } from './game-object';

export class ShipCamera extends GameObject {
    public camera: Camera;

    constructor(ratio: number) {
        super('mainCamera');
        this.camera = new PerspectiveCamera(80, ratio, 0.1, 50000);
    }
}