import { Light, PointLight, SpotLight, Vector3 } from 'three';

export class LightFactory {
    public create(x: number, y: number, z: number): Light {
        const light = new PointLight(0xff000, 1, 100);
        if (x && y && z) {
            light.position.set(x, y, z);
        }
        return light;
    }
}

export default new LightFactory();