<template>
    <div data-component="game">
        <div class="options">
            <button @click="close">Enable/Disable</button>
            <button @click="speed">++</button>
            <button @click="slow">--</button>
        </div>
        <scene v-if="enabled" :options="options" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Scene from '@/components/Scene.vue';

@Component({
    components: {
        Scene
    }
})
export default class Game extends Vue {
    public options: {speed: number} = {speed: 0.08};
    private enabled: boolean = true;
    private close() {
        this.enabled = !this.enabled;
    }
    private speed() {
        this.options.speed += 0.02;
    }
    private slow() {
        this.options.speed -= 0.02;
    }
}
</script>

<style scoped>
.options {
    position: absolute;
    top: 0;
    left: 0;
}
</style>