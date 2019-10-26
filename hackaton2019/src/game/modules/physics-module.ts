import { Vector3, Quaternion, Object3D } from 'three';

export class PhysicsModule {
    public a_x: Vector3 = new Vector3();
    public v_x: Vector3 = new Vector3();
    public a_r: Vector3 = new Vector3();
    public v_r: Vector3 = new Vector3();

    constructor(private gameObject: Object3D) { }

    public setA_X(acc: Vector3) {
        this.a_x = acc;
    }

    public setA_R(acc: Vector3) {
        this.a_r = acc;
    }

    public update(time: number) {
        // update velocity with acceleration
        this.v_x.add(this.a_x.clone().multiplyScalar(time));
        // update position with velocity
        this.gameObject.position.add(this.v_x.clone().multiplyScalar(time));

        // update velocity quaternion
        this.a_r.add(this.a_r.clone().multiplyScalar(time));
        this.gameObject.rotateX(this.v_r.x * time);
        this.gameObject.rotateY(this.v_r.y * time);
        this.gameObject.rotateZ(this.v_r.z * time);
    }
}