import { Mesh, Scene } from "three";
import PlanetFactory from "@/game/factories/planet-factory";
import { GameObject } from "./game-object";
import { PlanetType } from '@/game/enums/planet-type.enum';

export class Planet extends GameObject {
    private mesh!: Mesh;

    public init(scene: Scene): void {
        this.mesh = PlanetFactory.create(PlanetType.venus);
        scene.add(this.mesh);
    }

    public update(): void {
        this.mesh.rotation.y += 1 / 32 * 0.1;
    }
}
