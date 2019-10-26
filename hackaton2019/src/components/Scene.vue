<template>
    <div data-component="scene" class="scene" ref="scene" />
</template>

<script lang="ts">
import PlanetFactory from "@/game/factories/planet-factory";
import LightFactory from "@/game/factories/light-factory";
import { Component, Vue } from "vue-property-decorator";
import { PerspectiveCamera, WebGLRenderer, Scene as TScene, BoxGeometry, MeshBasicMaterial, Mesh, SphereGeometry, MeshPhongMaterial, ImageUtils, TextureLoader, MeshStandardMaterial, Vector3 } from "three";
import { GameObject } from '@/game/game-object';
import { Planet } from '@/game/planet';
import { PlanetType } from '@/game/enums/planet-type.enum';
import {ShipCamera} from '@/game/ship-camera';
import SceneManager from '@/services/scene-manager';
import { Ship } from '@/game/ship';

@Component
export default class Scene extends Vue {
    private camera!: ShipCamera;
    private renderer: WebGLRenderer = new WebGLRenderer();
    private sceneManager = SceneManager;

    private mounted() {
        let el = this.$refs.scene as HTMLDivElement;
        this.renderer.setSize(el.clientWidth, el.clientHeight);
        el.append(this.renderer.domElement);

        this.camera = new ShipCamera(el.clientWidth / el.clientHeight);
        this.camera.init();
        const ship = SceneManager.addGameObject('ship', new Ship(this.camera.camera), new Vector3(0, 0, 10));
        SceneManager.addGameObject('earth', new Planet());
        SceneManager.addObject(LightFactory.create(25, 25, 25));

        // Start update frames
        this.animate();
    }

    private animate(): void {
        requestAnimationFrame(this.animate);
        for (const go of SceneManager.gameObjects) {
            go.update();
        }
        this.camera.update();
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