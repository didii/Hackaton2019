import { Scene, Object3D, Material } from 'three';
import { Module } from './modules/module';
import { GravityModule } from './modules/gravity-module';
import { MaterialModule } from './modules/material-module';
import { PhysicsModule } from './modules/physics-module';
import { VicinityModule } from './modules/vicinity-module';
import { CollisionModule } from './modules/collision-module';

export class GameObject extends Object3D {
    private __type: string = 'GameObject';
    public enabled: boolean = true;
    public modules: ModulesCollection = new ModulesCollection();

    public init(scene?: Scene): void {}

    public update(timeDelta: number): void {
        for (const key in this.modules) {
            const module = this.modules[key];
            if (module && module.enabled) {
                module.update(timeDelta);
            }
        }
    }

    public destroy(): void { }

    public static is(obj: Object3D): obj is GameObject {
        return (obj as any).__type == 'GameObject';
    }
}

export class ModulesCollection {
    constructor(init?: Partial<ModulesCollection>) {
        Object.assign(this, init);
    }
    [key: string]: Module | undefined;
    public material?: MaterialModule;
    public physics?: PhysicsModule;
    public vicinity?: VicinityModule;
    public gravity?: GravityModule;
    public collision?: CollisionModule;
}