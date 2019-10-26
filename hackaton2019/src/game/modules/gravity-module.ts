import { GameObject } from '../game-object';
import { PhysicsModule } from './physics-module';
import { MaterialModule } from './material-module';
import { Module } from './module';
import SceneManager from '@/services/scene-manager';

export class GravityModule extends Module {
    private sceneManager = SceneManager;

    constructor(
        public gameObject: GameObject,
        public physics: PhysicsModule,
        public material: MaterialModule
    ) {
        super();
    }

    public update(timeDelta: number): void {
        // Find all objects in the vicinity
        let inRange = this.sceneManager.findInSphere(this.gameObject.position, 100);

    }
}