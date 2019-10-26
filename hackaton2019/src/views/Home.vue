<template>
  <div class="home">
    <game />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Game from '@/components/Game.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
    Game
  }
}
</script>

<style scoped>
.home {
    height: 100%;
    width: 100%;
}
</style>