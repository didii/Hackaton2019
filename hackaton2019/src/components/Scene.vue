<template>
    <div data-component="scene" class="scene" ref="scene" />
</template>

<script lang="ts">
import PlanetFactory from "@/game/factories/planet-factory";
import LightFactory from "@/game/factories/light-factory";
import { Component, Vue } from "vue-property-decorator";
import {
    PerspectiveCamera,
    WebGLRenderer,
    Scene as TScene,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    SphereGeometry,
    MeshPhongMaterial,
    ImageUtils,
    TextureLoader,
    MeshStandardMaterial
} from "three";

@Component
export default class Scene extends Vue {
    private camera!: PerspectiveCamera;
    private renderer: WebGLRenderer = new WebGLRenderer();
    private scene: TScene = new TScene();

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

        this.scene.add(planet);
        this.scene.add(light);
        this.camera.position.z = 2;

        const animate = () => {
            requestAnimationFrame(animate);
            planet.rotation.y += 1 / 32 * 0.1;
            this.renderer.render(this.scene, this.camera);
        };
        animate();
    }

    private generatePlanet() { }
}
</script>

<style scoped>
.scene {
    width: 100%;
    height: 100%;
}
</style>