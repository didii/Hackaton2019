import { Vector3, Object3D } from 'three';

export class PhysicsModule {
    public a_x: Vector3 = new Vector3();
    public v_x: Vector3 = new Vector3();
    public a_r: Vector3 = new Vector3();
    public v_r: Vector3 = new Vector3();
    public x_drag: number = 0;
    public r_drag: number = 0;

    constructor(private gameObject: Object3D) {
    }

    public setA_X(acc: Vector3) {
        this.a_x = acc;
    }

    public setA_R(acc: Vector3) {
        this.a_r = acc;
    }

    public update(timeDelta: number) {
        // update velocity with acceleration
        this.v_x.add(this.a_x.clone().multiplyScalar(timeDelta));
        // apply drag
        if (this.x_drag) {
            this.v_x.add(this.v_x.clone().multiplyScalar(-this.x_drag * timeDelta));
        }
        // update position with velocity
        this.gameObject.position.add(this.v_x.clone().multiplyScalar(timeDelta));

        // update velocity quaternion
        this.v_r.add(this.a_r.clone().multiplyScalar(timeDelta));
        //apply drag
        if (this.r_drag) {
            this.v_r.add(this.v_r.clone().multiplyScalar(-this.x_drag * timeDelta));
        }
        // update rotation
        this.gameObject.rotateX(this.v_r.x * timeDelta);
        this.gameObject.rotateY(this.v_r.y * timeDelta);
        this.gameObject.rotateZ(this.v_r.z * timeDelta);
    }
}