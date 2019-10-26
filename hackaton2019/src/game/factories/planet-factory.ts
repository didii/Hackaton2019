import { Mesh, SphereGeometry, MeshPhongMaterial, TextureLoader, Color, PointLight } from 'three';
import { PlanetDefinition } from '@/game/planet-definition';
import { StaticItems } from '@/game/static-items';

export class PlanetFactory {
    private imagePath = 'img/textures/';
    private loader = new TextureLoader();

    public create(planet: PlanetDefinition): Mesh {
        const geometry = new SphereGeometry(0.5, 32, 32);
        const material = this.createPlanetMaterial(
            `${this.imagePath}${planet.type.toString()}/map.jpg`,
            `${this.imagePath}${planet.type.toString()}/bump.jpg`,
            `${this.imagePath}${planet.type.toString()}/spec.jpg`,
            planet.isStar
        );

        const mesh = new Mesh(geometry, material);

        if (planet.isStar) {
            const light = new PointLight(StaticItems.lightColor, 1, 5);
            mesh.add(light);
        }

        return mesh;
    }

    private createPlanetMaterial(texturePath: string, bumpPath: string, specularPath: string, isStar: boolean): MeshPhongMaterial {
        const material = new MeshPhongMaterial({ map: this.loader.load(texturePath) });

        if (bumpPath) {
            material.bumpMap = this.loader.load(bumpPath);
            material.bumpScale = 0.02;
        }

        if (specularPath) {
            material.specularMap = this.loader.load(specularPath);
            material.specular = new Color('grey');
        }

        if (isStar) {
            material.emissive = StaticItems.lightColor;
        }

        return material;
    }
}

export default new PlanetFactory();