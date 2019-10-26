import { PlanetType } from '@/game/enums/planet-type.enum';

export class PlanetDefinition {

    public type: PlanetType = PlanetType.earth;
    public isStar = false;

    constructor(init?: Partial<PlanetDefinition>) {
        Object.assign(this, init);
    }
}