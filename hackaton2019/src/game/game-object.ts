import { Scene, Object3D } from 'three';
import { Module } from './modules/module';

export class GameObject extends Object3D {
    public enabled: boolean = true;
    public modules: { [key: string]: Module } = {};
    public init(scene?: Scene): void {
        for (const key in this.modules) {
            this.modules[key].init();
        }
    }
    public update(timeDelta: number): void {
        for (const key in this.modules) {
            const module = this.modules[key];
            if (module.enabled) {
                this.modules[key].update(timeDelta);
            }
        }
    }
    public destroy(): void { }
}