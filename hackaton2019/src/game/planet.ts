import { Mesh, Scene, Plane } from "three";
import PlanetFactory from "@/game/factories/planet-factory";
import { GameObject } from "./game-object";
import { PlanetType } from '@/game/enums/planet-type.enum';
import { StaticItems } from '@/game/static-items';

export class Planet extends GameObject {
    private mesh!: Mesh;
    private planetType: PlanetType = PlanetType.earth;

    constructor(type?: PlanetType) {
        if (!type) {
            this.planetType = StaticItems.planetDefinitions[this.randomIntFromInterval(1, StaticItems.planetDefinitions.length)].type;
        }else {
            this.planetType = type;
        }
    }

    public init(scene: Scene): void {
        this.mesh = PlanetFactory.create(this.planetType);
        scene.add(this.mesh);
        this.mesh.position.set(0, 0, 0);
    }

    public update(): void {
        this.mesh.rotation.y += 1 / 32 * 0.1;
    }


    private randomIntFromInterval(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
