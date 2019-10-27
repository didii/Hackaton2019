import { PlanetType } from '@/game/enums/planet-type.enum';

export class PlanetDefinition {

    public type: PlanetType = PlanetType.earth;
    public isStar = false;
    public radius: number = 0;

    constructor(init?: Partial<PlanetDefinition>) {
        Object.assign(this, init);
    }
}