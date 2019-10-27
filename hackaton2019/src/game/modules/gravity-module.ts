import { GameObject } from '../game-object';
import { PhysicsModule } from './physics-module';
import { MaterialModule } from './material-module';
import { Module } from './module';
import { Vector3 } from 'three';
import { VicinityModule } from './vicinity-module';

export class GravityModule extends Module {
    public readonly G: number = 1.5;
    private get physics(): PhysicsModule {
        return this.gameObject.modules.physics!;
    }
    private get material(): MaterialModule {
        return this.gameObject.modules.material!;
    }
    private get vicinity(): VicinityModule {
        return this.gameObject.modules.vicinity!;
    }

    constructor(
        public gameObject: GameObject
    ) {
        super();
    }

    public update(timeDelta: number): void {
        // Find all objects in the vicinity
        let inRange = this.vicinity.get();
        let a = new Vector3();
        for (const other of inRange) {
            if (other !== this.gameObject && GameObject.is(other) && other.modules.material) {
                let dir = other.position.clone().addScaledVector(this.gameObject.position, -1);
                let dist = dir.length();
                let amp = this.G * other.modules.material.mass / (dist * dist);
                a.add(dir.normalize().multiplyScalar(amp * timeDelta));
            }
        }
        this.physics.setForce('gravity', a);
    }
}