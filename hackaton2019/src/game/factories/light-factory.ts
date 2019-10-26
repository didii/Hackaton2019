import { Light, PointLight, SpotLight, Vector3 } from 'three';
import { StaticItems } from '@/game/static-items';

export class LightFactory {
    public create(x: number, y: number, z: number): Light {
        const light = new PointLight(StaticItems.lightColor, 3, 100);
        if (x && y && z) {
            light.position.set(x, y, z);
        }
        return light;
    }
}

export default new LightFactory();