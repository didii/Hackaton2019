import { Mesh, SphereGeometry, MeshPhongMaterial, TextureLoader, Color } from 'three';
import { PlanetType } from '@/game/enums/planet-type.enum';

export class PlanetFactory {
    private imagePath = 'img/textures/';
    private loader = new TextureLoader();

    public create(planet: PlanetType): Mesh {
        const geometry = new SphereGeometry(0.5, 32, 32);
        const material = this.createPlanetMaterial(
            `${this.imagePath}${planet.toString()}/map.jpg`,
            `${this.imagePath}${planet.toString()}/bump.jpg`,
            `${this.imagePath}${planet.toString()}/spec.jpg`
        );

        return new Mesh(geometry, material);
    }

    private createPlanetMaterial(texturePath: string, bumpPath: string, specularPath: string): MeshPhongMaterial {
        const material = new MeshPhongMaterial({ map: this.loader.load(texturePath) });

        if (bumpPath) {
            material.bumpMap = this.loader.load(bumpPath);
            material.bumpScale = 0.02;
        }

        if (specularPath) {
            material.specularMap = this.loader.load(specularPath);
            material.specular = new Color('grey');
        }

        return material;
    }
}

export default new PlanetFactory();