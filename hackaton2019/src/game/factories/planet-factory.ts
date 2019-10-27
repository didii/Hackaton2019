import { Mesh, SphereGeometry, MeshPhongMaterial, TextureLoader, Color, PointLight, SpriteMaterial, AdditiveBlending, Sprite } from 'three';
import { PlanetDefinition } from '@/game/planet-definition';
import { Consts } from '@/game/consts';

export class PlanetFactory {
    private imagePath = 'img/textures/';
    private loader = new TextureLoader();

    public create(def: PlanetDefinition): Mesh {
        const geometry = new SphereGeometry(def.radius, 32, 32);
        const material = this.createPlanetMaterial(
            `${this.imagePath}${def.type.toString()}/map.jpg`,
            `${this.imagePath}${def.type.toString()}/bump.jpg`,
            `${this.imagePath}${def.type.toString()}/spec.jpg`,
            def.isStar
        );

        const mesh = new Mesh(geometry, material);
        mesh.receiveShadow = true;
        mesh.castShadow = true;

        if (def.isStar) {
            const light = new PointLight(Consts.lightColor, 3, 500);
            light.castShadow = true;
            mesh.add(light);

            var spriteMaterial = new SpriteMaterial({
                map: this.loader.load('img/glow.png'),
                color: Consts.lightColor,
                transparent: true,
                blending: AdditiveBlending
            });
            var sprite = new Sprite(spriteMaterial);
            sprite.scale.set(4 * def.radius, 4 * def.radius, 2 * def.radius);
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
            material.emissive = Consts.lightColor;
        }

        material.shininess = 0;

        return material;
    }
}

export default new PlanetFactory();