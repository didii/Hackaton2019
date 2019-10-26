import { Mesh, BoxGeometry, MeshBasicMaterial, MeshStandardMaterial } from 'three';

export class PlanetFactory {
    public create(): Mesh {
        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshStandardMaterial({color: 0x888888});
        const cube = new Mesh(geometry, material);
        return cube;
    }
}

export default new PlanetFactory();