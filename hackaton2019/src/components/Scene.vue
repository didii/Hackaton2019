<template>
    <div data-component="scene" class="scene" ref="scene" />
</template>

<script lang="ts">
import PlanetFactory from "@/game/factories/planet-factory";
import LightFactory from "@/game/factories/light-factory";
import { Component, Vue, Prop } from "vue-property-decorator";
import { PerspectiveCamera, WebGLRenderer, Scene as TScene, BoxGeometry, MeshBasicMaterial, Mesh, SphereGeometry, MeshPhongMaterial, ImageUtils, TextureLoader, MeshStandardMaterial, Vector3, Plane } from "three";
import { GameObject } from '@/game/game-object';
import { Planet } from '@/game/planet';
import { PlanetType } from '@/game/enums/planet-type.enum';
import {ShipCamera} from '@/game/ship-camera';
import SceneManager from '@/services/scene-manager';
import { Ship } from '@/game/ship';
import { Background } from '@/game/background';
import { Consts } from '../game/consts';
import { Helper } from '../game/enums/helper';

@Component
export default class Scene extends Vue {
    private enabled: boolean = true;
    private camera!: ShipCamera;
    private renderer: WebGLRenderer = new WebGLRenderer({ antialias: true });
    private sceneManager = SceneManager;
    private lastTime = new Date().getTime();
    @Prop({required: true})
    private options!: {speed: number};

    private mounted() {
        SceneManager.clear();
        this.lastTime = new Date().getTime();
        let el = this.$refs.scene as HTMLDivElement;
        this.renderer.setSize(el.clientWidth, el.clientHeight);
        el.append(this.renderer.domElement);

        this.camera = new ShipCamera(el.clientWidth / el.clientHeight);
        this.camera.init();
        
        const ship = SceneManager.addGameObject(new Ship(this.camera.camera), new Vector3(0, 0, 1500));
        // First create the sun
        const amount = 25;
        for (let i = 0; i < amount; i++) {
            const idx = Helper.randInt(0, Consts.planetDefinitions.length - 1);
            const def = Consts.planetDefinitions[idx];
            const planet = SceneManager.addGameObject(new Planet('planet' + i, def.type));
            const maxSpeed = 20;
            const rnd = () => Helper.rand(-maxSpeed, maxSpeed);
            const speed = new Vector3(rnd(), rnd(), rnd());
            planet.modules.physics!.v_x.set(speed.x, speed.y, speed.z);
        }
        SceneManager.addGameObject(new Background());

        // Start update frames
        this.animate();
    }

    private beforeDestroy() {
        this.enabled = false;
        SceneManager.scene.dispose();
    }

    private animate() {
        if (this.enabled) {
            requestAnimationFrame(this.animate);
        }
        let prevTime = this.lastTime;
        this.lastTime = new Date().getTime();
        let delta = this.options.speed;//(this.lastTime - prevTime) / 1000;
        for (const go of SceneManager.gameObjects) {
            go.update(delta);
        }
        this.camera.update(delta);
        this.renderer.render(SceneManager.scene, this.camera.camera);
    }
}
</script>

<style scoped>
.scene {
    width: 100%;
    height: 100%;
}
</style>