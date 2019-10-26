import { Camera, PerspectiveCamera, Vector3 } from 'three';
import { GameObject } from './game-object';
import { Ship } from './ship';

export class ShipCamera extends GameObject {
    public camera: Camera;
    private acceleration: Vector3 = new Vector3();

    constructor(ratio: number) {
        super();
        this.camera = new PerspectiveCamera(80, ratio, 0.1, 1000);
    }

    public init() {
        // window.addEventListener('keydown', e => this.onKey(e, true));
        // window.addEventListener('keyup', e => this.onKey(e, false));
    }

    public update(): void {
        this.camera.position.add(this.acceleration);
    }

    public onKey(key: KeyboardEvent, isDown: boolean) {
        if (key.key === 'w') {
            this.acceleration.z = isDown ? -0.1 : 0;
        }
        if (key.key === 's') {
            this.acceleration.z = isDown ? 0.1 : 0;
        }
    }

}