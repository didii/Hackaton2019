<template>
    <div data-component="game">
        <div class="options">
            <button @click="close">Enable/Disable</button>
        </div>
        <scene v-if="enabled" />
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
    private enabled: boolean = true;
    private close() {
        this.enabled = !this.enabled;
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