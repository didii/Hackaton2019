<template>
    <div data-component="scene" class="scene" ref="scene" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { PerspectiveCamera, WebGLRenderer, Scene as TScene, BoxGeometry, MeshBasicMaterial, Mesh, Vector3 } from 'three';
import PlanetFactory from '@/services/planet-factory';
import LightFactory from '@/services/light-factory';

@Component
export default class Scene extends Vue {
    private camera!: PerspectiveCamera;
    private renderer: WebGLRenderer = new WebGLRenderer();
    private scene: TScene = new TScene();
    private sceneElement: HTMLDivElement = this.$refs.scene as HTMLDivElement;

    private mounted() {
        let el = this.$refs.scene as HTMLDivElement;
        this.camera = new PerspectiveCamera(80, el.clientWidth / el.clientHeight, 0.1, 1000);
        this.renderer.setSize(el.clientWidth, el.clientHeight);
        el.append(this.renderer.domElement);

        const planet = PlanetFactory.create();
        const light = LightFactory.create(2, 2, 2);

        this.scene.add(planet);
        this.scene.add(light);
        this.camera.position.z = 5;

        const animate = () => {
            requestAnimationFrame(animate);
            planet.rotation.x += 0.01;
            planet.rotation.y += 0.01;
            this.renderer.render(this.scene, this.camera);
        }
        animate();
    }

    private generatePlanet() {

    }
}
</script>

<style scoped>
.scene {
    width: 100%;
    height: 100%;
}
</style>