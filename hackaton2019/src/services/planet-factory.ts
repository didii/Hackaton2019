import {
    Mesh, SphereGeometry, TextureLoader, MeshPhongMaterial, Color
} from 'three';

export class PlanetFactory {

    private loader = new TextureLoader();

    public create(): Mesh {
        const geometry = new SphereGeometry(0.5, 32, 32);
        const material = this.createPlanetMaterial('img/textures/earthmap1k.jpg', 'img/textures/earthbump1k.jpg', 'img/textures/earthspec1k.jpg');

        return new Mesh(geometry, material);
    }

    private createPlanetMaterial(texturePath: string, bumpPath: string, specularPath: string): MeshPhongMaterial {
        return new MeshPhongMaterial({
            bumpMap: this.loader.load(bumpPath),
            bumpScale: 0.05,
            map: this.loader.load(texturePath),
            specularMap: this.loader.load(specularPath),
            specular: new Color('grey')
        });
    }
}

export default new PlanetFactory();