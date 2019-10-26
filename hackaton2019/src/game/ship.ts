import { GameObject } from './game-object';
import { Scene, Mesh, CylinderGeometry, MeshStandardMaterial, Vector3, Camera, Euler } from 'three';
import { Key } from 'ts-key-enum';
import { PhysicsModule } from './modules/physics-module';

export class Ship extends GameObject {
    public mesh!: Mesh;
    private physics: PhysicsModule;

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
        this.physics = new PhysicsModule(this);
    }

    public init(scene: Scene): void {
        this.add(this.mesh);
        this.add(this.camera);
        
        scene.add(this);

        window.addEventListener('keydown', e => this.onKey(e, true));
        window.addEventListener('keyup', e => this.onKey(e, false));
    }

    public update(): void {
        this.physics.update(1);
    }

    public onKey(key: KeyboardEvent, isDown: boolean) {
        if (key.key === 'a') {
            this.physics.a_x.z = isDown ? -0.1 : 0;
        } else if (key.key === 'z') {
            this.physics.a_x.z = isDown ? 0.1 : 0;
        }
        if (key.key === '8') {
            this.physics.a_r.y = isDown ? 0.1 : 0;
        } else if (key.key === '2') {
            this.physics.a_r.y = isDown ? -0.1 : 0;
        }
        if (key.key === '6') {
            this.physics.a_r.x = isDown ? 0.1 : 0;
        } else if (key.key === '4') {
            this.physics.a_r.x = isDown ? -0.1 : 0;
        }
    }
}