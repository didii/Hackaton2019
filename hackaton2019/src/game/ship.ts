import { GameObject } from './game-object';
import { Scene, Vector3, Camera, PointLight } from 'three';
import { PhysicsModule } from './modules/physics-module';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { StaticItems } from '@/game/static-items';

export class Ship extends GameObject {
    private physics: PhysicsModule;
    private loader = new GLTFLoader();
    private forwardSpeed: number = 0.7;
    private turnSpeed: number = 0.2;

    constructor(private camera: Camera, position?: Vector3) {
        super();
        if (!position) {
            position = new Vector3();
        }
        this.camera.position.set(position.x, position.y + 2, position.z + 5);

        this.loader.load('models/ship.glb', (obj) => {
            obj.scene.castShadow = true;
            obj.scene.receiveShadow = true;
            this.add(obj.scene);
            this.camera.lookAt(obj.scene.position);
        });

        this.physics = new PhysicsModule(this);
        this.physics.x_drag = 0.2;
        this.physics.r_drag = 0.2;
    }

    public init(scene: Scene): void {
        super.init(scene);
        this.add(this.camera);

        scene.add(this);

        window.addEventListener('keydown', e => this.onKey(e, true));
        window.addEventListener('keyup', e => this.onKey(e, false));
    }

    public update(timeDelta: number): void {
        super.update(timeDelta);
        this.physics.update(timeDelta);
    }

    public onKey(key: KeyboardEvent, isDown: boolean) {
        if (key.key === 'w') {
            let forward = new Vector3(0, 0, -this.forwardSpeed).applyQuaternion(this.quaternion);
            this.physics.a_x = isDown ? forward : new Vector3();
        } else if (key.key === 's') {
            let forward = new Vector3(0, 0, this.forwardSpeed).applyQuaternion(this.quaternion);
            this.physics.a_x = isDown ? forward : new Vector3();
        }
        if (key.key === '4') {
            this.physics.a_r.z = isDown ? this.turnSpeed : 0;
        }
        if (key.key === '6') {
            this.physics.a_r.z = isDown ? -this.turnSpeed : 0;
        }
        if (key.key === '8') {
            this.physics.a_r.x = isDown ? -this.turnSpeed : 0;
        } else if (key.key === '2') {
            this.physics.a_r.x = isDown ? this.turnSpeed : 0;
        }
        if (key.key === 'a') {
            this.physics.a_r.y = isDown ? this.turnSpeed : 0;
        } else if (key.key === 'd') {
            this.physics.a_r.y = isDown ? -this.turnSpeed : 0;
        }
    }
}