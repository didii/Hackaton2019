import { Module } from './module';
import { GameObject } from '../game-object';
import SceneManager from '@/services/scene-manager';
import { Object3D } from 'three';

export class VicinityModule extends Module {
    private sceneManager = SceneManager;
    public range: number = 0;
    private cached?: GameObject[];

    constructor(public gameObject: GameObject) {
        super();
    }

    public init(data: { range: number }) {
        this.range = data.range;
    }

    public update(timeDelta: number): void {
        this.cached = undefined;
    }

    public get(): GameObject[] {
        if (!this.cached) {
            const withinRange = this.sceneManager.findInSphere(this.gameObject.position, this.range);
            this.cached = withinRange.filter(x => x !== this.gameObject && GameObject.is(x) && x.enabled) as GameObject[];
        }
        return this.cached;
    }
}