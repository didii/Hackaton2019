<template>
    <div data-component="scene" class="scene" ref="scene" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { PerspectiveCamera, WebGLRenderer, Scene as TScene, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

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

        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshBasicMaterial({color: 0x00ff00});
        const cube = new Mesh(geometry, material);

        this.scene.add(cube);
        this.camera.position.z = 5;

        const animate = () => {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            this.renderer.render(this.scene, this.camera);
        }
        animate();
    }
}
</script>

<style scoped>
.scene {
    width: 100%;
    height: 100%;
}
</style>