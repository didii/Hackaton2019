import { Mesh, Scene } from "three";
import PlanetFactory from "@/game/factories/planet-factory";
import { GameObject } from "./game-object";
import { PlanetType } from '@/game/enums/planet-type.enum';
import { StaticItems } from '@/game/static-items';
import { PlanetDefinition } from '@/game/planet-definition';
import { PhysicsModule } from './modules/physics-module';

export class Planet extends GameObject {
    private mesh!: Mesh;
    private planetDefinition: PlanetDefinition = new PlanetDefinition();
    private physics: PhysicsModule;

    constructor(type?: PlanetType) {
        super();

        const randomizedType = type ? type : StaticItems.planetDefinitions[this.randomIntFromInterval(1, StaticItems.planetDefinitions.length)].type;

        this.planetDefinition = new PlanetDefinition({
            type: randomizedType,
            isStar: randomizedType === PlanetType.sun
        });
        this.physics = new PhysicsModule(this);
        this.physics.v_r.set(0, 0.1, 0);
    }

    public init(scene: Scene): void {
        this.mesh = PlanetFactory.create(this.planetDefinition);
        this.add(this.mesh);
        scene.add(this);
        if (this.planetDefinition.isStar) {
            this.position.set(0, 0, 0);
        } else {
            this.position.set(1, 0.5, -0.8);
        }
    }

    public update(timeDelta: number): void {
        this.physics.update(timeDelta);
    }

    private randomIntFromInterval(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
