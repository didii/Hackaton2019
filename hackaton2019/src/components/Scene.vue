<template>
    <div data-component="scene" class="scene" ref="scene" />
</template>

<script lang="ts">
import PlanetFactory from "@/game/factories/planet-factory";
import LightFactory from "@/game/factories/light-factory";
import { Component, Vue } from "vue-property-decorator";
import { PerspectiveCamera, WebGLRenderer, Scene as TScene, BoxGeometry, MeshBasicMaterial, Mesh, SphereGeometry, MeshPhongMaterial, ImageUtils, TextureLoader, MeshStandardMaterial } from "three";
import { GameObject } from '@/game/game-object';
import { Planet } from '@/game/planet';

@Component
export default class Scene extends Vue {
    private camera!: PerspectiveCamera;
    private renderer: WebGLRenderer = new WebGLRenderer();
    private scene: TScene = new TScene();

    private gameObjects: GameObject[] = [
        new Planet()
    ];

    private mounted() {
        let el = this.$refs.scene as HTMLDivElement;
        this.camera = new PerspectiveCamera(
            80,
            el.clientWidth / el.clientHeight,
            0.1,
            1000
        );
        this.renderer.setSize(el.clientWidth, el.clientHeight);
        el.append(this.renderer.domElement);

        const planet = PlanetFactory.create();
        const light = LightFactory.create(25, 25, 25);

        //this.scene.add(planet);
        this.scene.add(light);
        this.camera.position.z = 2;

        // Initialize all game objects
        for (const go of this.gameObjects) {
            go.init(this.scene);
        }

        // Start update frames
        this.animate();
    }

    private animate(): void {
        requestAnimationFrame(this.animate);
        for (const go of this.gameObjects) {
            go.update();
        }
        this.renderer.render(this.scene, this.camera);
    }
}
</script>

<style scoped>
.scene {
    width: 100%;
    height: 100%;
}
</style>