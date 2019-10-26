import { Mesh, SphereGeometry, MeshPhongMaterial, TextureLoader, Color, PointLight, SpriteMaterial, AdditiveBlending, Sprite } from 'three';
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
        mesh.receiveShadow = true;
        mesh.castShadow = true;

        if (planet.isStar) {
            const light = new PointLight(StaticItems.lightColor, 3, 5);
            light.castShadow = true;
            mesh.add(light);

            var spriteMaterial = new SpriteMaterial({
                map: this.loader.load('img/glow.png'),
                color: StaticItems.lightColor,
                transparent: false,
                blending: AdditiveBlending
            });
            var sprite = new Sprite(spriteMaterial);
            sprite.scale.set(2, 2, 1.0);
            mesh.add(sprite); // this centers the glow at the mesh
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

        material.shininess = 0;

        return material;
    }
}

export default new PlanetFactory();