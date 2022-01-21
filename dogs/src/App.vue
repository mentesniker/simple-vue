<template>
  <div id="app">
    <Tabla />
  </div>
</template>

<script>
import Tabla from './components/tabla.vue'

export default {
  name: 'App',
  components: {
    Tabla
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
