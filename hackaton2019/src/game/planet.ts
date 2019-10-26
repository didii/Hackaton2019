import { Mesh, Scene } from "three";
import PlanetFactory from "@/game/factories/planet-factory";
import { GameObject } from "./game-object";

export class Planet implements GameObject {
    private mesh!: Mesh;

    public init(scene: Scene): void {
        this.mesh = PlanetFactory.create();
        scene.add(this.mesh);
    }

    public update(): void {
        this.mesh.position.x += 1;
        this.mesh.position.y += 1;
    }
}
