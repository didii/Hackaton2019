import { Mesh, BoxGeometry, MeshBasicMaterial } from 'three';

export class PlanetFactory {
    public create(): Mesh {
        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshBasicMaterial({color: 0x00ff00});
        const cube = new Mesh(geometry, material);
        return cube;
    }
}

export default new PlanetFactory();