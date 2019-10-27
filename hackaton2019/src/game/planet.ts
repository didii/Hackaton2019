import { Mesh, Scene, Geometry, SphereGeometry } from "three";
import PlanetFactory from "@/game/factories/planet-factory";
import { GameObject } from "./game-object";
import { PlanetType } from '@/game/enums/planet-type.enum';
import { Consts } from '@/game/consts';
import { PlanetDefinition } from '@/game/planet-definition';
import { PhysicsModule } from './modules/physics-module';
import { ModulesCollection } from './game-object';
import { MaterialModule } from './modules/material-module';
import { GravityModule } from './modules/gravity-module';
import { VicinityModule } from './modules/vicinity-module';
import { CollisionModule } from './modules/collision-module';
import SceneManager from '@/services/scene-manager';
import { Helper } from './enums/helper';

export class Planet extends GameObject {
    private mesh: Mesh;
    private planetDefinition: PlanetDefinition = new PlanetDefinition();
    public modules: ModulesCollection = new ModulesCollection({
        physics: new PhysicsModule(this),
        vicinity: new VicinityModule(this),
        material: new MaterialModule(this),
        gravity: new GravityModule(this),
        collision: new CollisionModule(this),
    });

    constructor(name: string, type?: PlanetType) {
        super(name);
        if (!type) {
            type = Consts.planetDefinitions[Helper.randInt(1, Consts.planetDefinitions.length)].type;
        }

        this.planetDefinition = new PlanetDefinition({
            type: type,
            isStar: type === PlanetType.sun,
            radius: Helper.rand(100, 200),
        });
        this.mesh = PlanetFactory.create(this.planetDefinition);
    }

    public init(scene: Scene): void {
        super.init(scene);

        // Modules
        this.modules.material!.init({
            density: Helper.rand(8, 12) * (this.planetDefinition.isStar ? 10 : 1),
            geometry: this.mesh.geometry as Geometry,
        });
        this.modules.vicinity!.init({ range: 1000 });
        this.modules.collision!.init({
            geometry: this.mesh.geometry as Geometry,
            onCollision: this.onCollision,
            grace: this.planetDefinition.radius * 0.2,
        });

        this.add(this.mesh);
        scene.add(this);

        if (this.planetDefinition.isStar) {
            this.position.set(0, 0, 0);
        } else {
            this.position.set(Helper.rand(-500, 500), Helper.rand(-500, 500), Helper.rand(-500, 500));
        }
    }

    public update(timeDelta: number): void {
        super.update(timeDelta);
    }

    private onCollision(other: GameObject) {
        // We only care about collisions with other objects with a material module
        // if (!(other.modules && other.modules.material)) return;

        if (this.modules.material!.mass < other.modules.material!.mass) {
            // if we are smaller, destroy ourselves
            SceneManager.destroy(this.name);
        } else {
            // otherwise absorb to gain POOOOOOOOOOOOOWER!
            let thisMaterial = this.modules.material!;
            let otherMaterial = other.modules.material!;
            let newSize = Math.sqrt((thisMaterial.mass + otherMaterial.mass) / (thisMaterial.density * Math.PI));
            this.mesh.geometry = new SphereGeometry(newSize, 32, 32);
            thisMaterial.forceUpdate();
        }
    }
}
