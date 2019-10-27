import { Module } from './module';
import { GameObject } from '../game-object';
import { VicinityModule } from './vicinity-module';

export class CollisionModule extends Module {
    private get vicinity(): VicinityModule {
        return this.gameObject.modules.vicinity!;
    }

    constructor(public gameObject: GameObject) {
        super();
    }

    public update(timeDelta: number) {
        let nearPlanets = this.vicinity.get();
        
    }
}