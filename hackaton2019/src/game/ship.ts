import { GameObject } from './game-object';
import { Scene, Vector3, Camera, Vector2 } from 'three';
import { PhysicsModule } from './modules/physics-module';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export class Ship extends GameObject {
    private physics: PhysicsModule;
    private loader = new GLTFLoader();
    private isBoosting: boolean = false;
    private boost: number = 50;
    private forwardSpeed: number = 1.5;
    private strafeSpeed: number = 2;
    private turnSpeed: number = 0.2;
    private localDirections: Vector3 = new Vector3();

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

        window.addEventListener('keydown', e => {
            if (!e.repeat) this.onKey(e, true);
        });
        window.addEventListener('keyup', e => this.onKey(e, false));
    }

    public update(timeDelta: number): void {
        super.update(timeDelta);
        this.physics.update(timeDelta);
    }

    public onKey(event: KeyboardEvent, isDown: boolean) {
        if (event.code === 'ShiftLeft') {
            this.isBoosting = isDown;
            for (const name of Object.keys(this.physics.forces)) {
                const force = this.physics.forces[name];
                if (this.isBoosting) {
                    force.multiplyScalar(this.boost);
                } else {
                    force.multiplyScalar(1 / this.boost);
                }
            }
            return;
        }

        let isBoosting = this.isBoosting;
        // Translations
        if (event.code === 'KeyW' || event.code === 'KeyS') {
            // Forward or backward
            let forwardSpeed = this.forwardSpeed * (isBoosting ? this.boost : 1);
            let sgn = isDown ? (event.key === 'w' ? -1 : 1) : 0;
            let force = new Vector3(0, 0, 1).multiplyScalar(forwardSpeed * sgn);
            this.physics.setForce('T:FB', force);
        } else if (event.code === 'KeyA' || event.code === 'KeyD') {
            // Left/Right
            let strafeSpeed = this.strafeSpeed * (isBoosting ? this.boost : 1);
            let sgn = isDown ? (event.code === 'KeyA' ? -1 : 1) : 0;
            let force = new Vector3(1, 0, 0).multiplyScalar(strafeSpeed * sgn);
            this.physics.setForce('T:LR', force);
        } else if (event.code === 'KeyQ' || event.code === 'KeyE') {
            // Up/Down
            let strafeSpeed = this.strafeSpeed * (isBoosting ? this.boost : 1);
            let sgn = isDown ? (event.code === 'KeyQ' ? -1 : 1) : 0;
            let force = new Vector3(0, 1, 0).multiplyScalar(strafeSpeed * sgn);
            this.physics.setForce('T:UD', force);
        }

        // Turning
        let turnSpeed = this.turnSpeed * (isBoosting ? this.boost : 1);
        if (event.code === 'KeyJ' || event.code === 'KeyL') {
            // Left/right
            let sgn = isDown ? (event.code === 'KeyJ' ? 1 : -1) : 0;
            this.physics.a_r.y = turnSpeed * sgn;
        } else if (event.code === 'KeyI' || event.code === 'KeyK') {
            // Up/down
            let sgn = isDown ? (event.code === 'KeyI' ? 1 : -1) : 0;
            this.physics.a_r.x = turnSpeed * sgn;
        }
        if (event.code === 'KeyU' || event.code === 'KeyO') {
            // Roll
            let sgn = isDown ? (event.code === 'KeyU' ? 1 : -1) : 0;
            this.physics.a_r.z = turnSpeed * sgn;
        }
    }
}