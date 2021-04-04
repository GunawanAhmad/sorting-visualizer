<template>
  <div id="app">
    <sortingVisualizer />
  </div>
</template>

<script>
import sortingVisualizer from "./components/sortingVisualizer.vue";
export default {
  name: "App",
  components: {
    sortingVisualizer,
  },
};
</script>

<style src="./style/App.css"></style>
