import { GameObject } from '@/game/game-object';
import { Mesh } from 'three/src/objects/Mesh';
import { Scene } from 'three/src/scenes/Scene';
import { CubeTextureLoader, Texture, LinearFilter } from 'three';

export class Background extends GameObject {

    private background: Texture;
    private loader = new CubeTextureLoader();
    private img = 'img/background/achtergrond_';

    constructor() {
        super();

        this.background = this.loader.load([
            `${this.img}right1.png`,
            `${this.img}left2.png`,
            `${this.img}top3.png`,
            `${this.img}bottom4.png`,
            `${this.img}front5.png`,
            `${this.img}back6.png`
        ]);
        this.background.minFilter = LinearFilter;
    }

    public init(scene: Scene): void {
        scene.background = this.background;
    }
}