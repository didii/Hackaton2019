import { GameObject } from '../game-object';
import { PhysicsModule } from './physics-module';
import { MaterialModule } from './material-module';
import { Module } from './module';
import SceneManager from '@/services/scene-manager';
import { Vector3, Mesh } from 'three';

export class GravityModule extends Module {
    private sceneManager = SceneManager;
    private get physics(): PhysicsModule {
        return this.gameObject.modules.physics!;
    }
    private get material(): MaterialModule {
        return this.gameObject.modules.material!;
    }

    constructor(
        public gameObject: GameObject
    ) {
        super();
    }

    public update(timeDelta: number): void {
        // Find all objects in the vicinity
        let inRange = this.sceneManager.findInSphere(this.gameObject.position, 100);
        let a = new Vector3();
        for (const other of inRange) {
            if (other !== this.gameObject && GameObject.is(other) && other.modules.material) {
                let dir = other.position.clone().addScaledVector(this.gameObject.position, -1);
                let dist = dir.length();
                let amp = this.material.mass * other.modules.material.mass / (dist * dist);
                a.add(dir.normalize().multiplyScalar(amp * timeDelta));
            }
        }
        this.physics.setForce('gravity', a);
    }
}