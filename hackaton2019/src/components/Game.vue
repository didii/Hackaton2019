<template>
    <div data-component="game">
        <scene />
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
    private mounted() {

    }
}
</script>
