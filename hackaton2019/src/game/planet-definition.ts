import { PlanetType } from '@/game/enums/planet-type.enum';

export class PlanetDefinition {

    public type: PlanetType = PlanetType.earth; 

    constructor(init?: Partial<PlanetDefinition>) {
        Object.assign(this, init);
    }
}