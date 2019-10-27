import { GameObject } from '../game-object';
import { Mesh, Material, Geometry } from 'three';
import { Module } from './module';

export class MaterialModule extends Module {
    public volume: number = 0;
    public mass: number = 0;
    public density: number = 0;
    public geometry?: Geometry;

    constructor(public gameObject: GameObject) {
        super();
    }

    public init(data: {geometry: Geometry, density: number}) {
        this.geometry = data.geometry;
        this.geometry.computeBoundingSphere();
        this.density = data.density;
        let r = data.geometry.boundingSphere.radius;
        let pi = Math.PI;
        this.volume = pi * r * r;
        this.mass = this.volume * this.density;
    }
}