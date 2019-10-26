import { Light, PointLight } from 'three';

export class LightFactory {
    public create(x: number, y: number, z: number): Light {
        const light = new PointLight('white', 3, 100);
        if (x && y && z) {
            light.position.set(x, y, z);
        }
        return light;
    }
}

export default new LightFactory();