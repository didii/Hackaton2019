import { GameObject } from './game-object';
import { Scene, Mesh, CylinderGeometry, MeshStandardMaterial, Vector3, Camera } from 'three';
import { Key } from 'ts-key-enum';

export class Ship extends GameObject {
    public mesh!: Mesh;
    private acceleration: Vector3 = new Vector3();

    constructor(private camera: Camera, position?: Vector3) {
        super();
        if (!position) {
            position = new Vector3();
        }
        this.camera.position.set(position.x, position.y + 2, position.z + 5);
        const geometry = new CylinderGeometry(0.25, 1, 2, 25, 25);
        const material = new MeshStandardMaterial({ color: 0x702fe0 });
        this.mesh = new Mesh(geometry, material);
        this.camera.lookAt(this.mesh.position);
    }

    public init(scene: Scene): void {
        this.add(this.mesh);
        this.add(this.camera);
        
        scene.add(this);

        window.addEventListener('keydown', e => this.onKey(e, true));
        window.addEventListener('keyup', e => this.onKey(e, false));
    }

    public update(): void {
        this.position.add(this.acceleration);
    }

    public onKey(key: KeyboardEvent, isDown: boolean) {
        if (key.code === 'Space') {
            this.acceleration.z = isDown ? -0.1 : 0;
        } else if (key.key === 'AltLeft') {
            this.acceleration.z = isDown ? 0.1 : 0;
        }
    }
}