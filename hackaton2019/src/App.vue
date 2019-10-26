<template>
  <div id="app">
    <game class="game" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import Game from '@/components/Game.vue';

@Component({
  components: {
    HelloWorld,
    Game
  },
})
export default class App extends Vue {}
</script>

<style>
html, body, #app, .game {
    margin: 0;
    height: 100%;
    width: 100%;
}
</style>
