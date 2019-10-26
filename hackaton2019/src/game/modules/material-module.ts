import { GameObject } from '../game-object';
import { Mesh, Material } from 'three';

export class MaterialModule {
    public enabled: boolean = false;
    public volume: number = 0;
    public mass: number = 0;

    constructor(public gameObject: GameObject, public mesh: Mesh, public density: number) {
        this.init();
        this.update(0);
    }

    public init() {
        this.mesh.geometry.computeBoundingSphere();
    }

    public update(timeDelta: number) {
        let r = this.mesh.geometry.boundingSphere.radius;
        let pi = Math.PI;
        this.volume = pi * r * r;
        this.mass = this.volume * this.density;
    }
}