import { Mesh, Scene, Geometry } from "three";
import PlanetFactory from "@/game/factories/planet-factory";
import { GameObject } from "./game-object";
import { PlanetType } from '@/game/enums/planet-type.enum';
import { StaticItems } from '@/game/static-items';
import { PlanetDefinition } from '@/game/planet-definition';
import { PhysicsModule } from './modules/physics-module';
import { ModulesCollection } from './game-object';
import { MaterialModule } from './modules/material-module';
import { GravityModule } from './modules/gravity-module';

export class Planet extends GameObject {
    private mesh: Mesh;
    private planetDefinition: PlanetDefinition = new PlanetDefinition();
    private physics: PhysicsModule;
    public modules: ModulesCollection = new ModulesCollection({
        physics: new PhysicsModule(this),
        material: new MaterialModule(this),
        gravity: new GravityModule(this)
    })

    constructor(type?: PlanetType) {
        super();

        const randomizedType = type ? type : StaticItems.planetDefinitions[this.randomIntFromInterval(1, StaticItems.planetDefinitions.length)].type;

        this.planetDefinition = new PlanetDefinition({
            type: randomizedType,
            isStar: randomizedType === PlanetType.sun
        });
        this.mesh = PlanetFactory.create(this.planetDefinition);

        // Modules
        this.physics = new PhysicsModule(this);
        this.physics.v_r.set(0, 0.1, 0);
    }

    public init(scene: Scene): void {
        super.init(scene);
        this.modules.material!.init({
            density: 5,
            geometry: this.mesh.geometry as Geometry,
        });
        this.add(this.mesh);
        scene.add(this);

        if(this.planetDefinition.isStar){
            this.position.set(0,0,0);
        }else {
            this.position.set(PlanetFactory.randomNumberFromInterval(-500, 500), PlanetFactory.randomNumberFromInterval(-500, 500), PlanetFactory.randomNumberFromInterval(-500, 500));
        }
    }

    public update(timeDelta: number): void {
        super.update(timeDelta);
    }

    private randomIntFromInterval(min: number, max: number): number {
        return Math.floor(PlanetFactory.randomNumberFromInterval(min, max));
    }
}
