import { Module } from './module';
import { GameObject } from '../game-object';
import { VicinityModule } from './vicinity-module';
import { Geometry } from 'three';

export class CollisionModule extends Module {
    private geometry!: Geometry;
    private onCollision?: (other: GameObject) => void;
    private grace: number = 0;
    private get vicinity(): VicinityModule {
        return this.gameObject.modules.vicinity!;
    }

    constructor(public gameObject: GameObject) {
        super();
    }

    public init(data: { geometry: Geometry, onCollision?: (other: GameObject) => void, grace?: number }) {
        this.geometry = data.geometry;
        if (!this.geometry.boundingSphere) this.geometry.computeBoundingSphere();
        this.onCollision = data.onCollision;
        if (data.grace) this.grace = data.grace;
    }

    public update(timeDelta: number) {
        let nearPlanets = this.vicinity.get();
        for (const other of nearPlanets) {
            if (!other.modules.collision) continue;
            let distance = other.position.clone().addScaledVector(this.gameObject.position, -1).length();
            let isColliding = other.modules.collision.geometry.boundingSphere.radius + this.geometry.boundingSphere.radius > distance + this.grace;
            if (isColliding && this.onCollision) {
                this.onCollision.call(this.gameObject, other);
            }
        }
    }
}