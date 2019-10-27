import { PlanetDefinition } from '@/game/planet-definition';
import { PlanetType } from '@/game/enums/planet-type.enum';
import { Color } from 'three';

export class Consts {
    static planetDefinitions = [
        new PlanetDefinition({ type: PlanetType.sun }),
        new PlanetDefinition({ type: PlanetType.earth }),
        new PlanetDefinition({ type: PlanetType.jupiter }),
        new PlanetDefinition({ type: PlanetType.mars }),
        new PlanetDefinition({ type: PlanetType.mercury }),
        new PlanetDefinition({ type: PlanetType.moon }),
        new PlanetDefinition({ type: PlanetType.neptune }),
        new PlanetDefinition({ type: PlanetType.pluto }),
        new PlanetDefinition({ type: PlanetType.saturn }),
        new PlanetDefinition({ type: PlanetType.uranus }),
        new PlanetDefinition({ type: PlanetType.venus }),
    ];

    static lightColor = new Color('white');
    static redColor = new Color('red');
}