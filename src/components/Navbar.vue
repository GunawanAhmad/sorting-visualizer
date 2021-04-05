<template>
  <nav class="navbar">
    <div class="select-algo select">
      <div class="box btn-style" @click="openAlgoList">
        <p>{{ selectAlgo }}</p>
        <div class="icon">
          <i class="fas fa-chevron-down"></i>
        </div>
      </div>
      <ul class="ul-list" v-if="isShowingAlgoList">
        <li @click="changeSelectedAlgo('Selection')">Selection Sort</li>
        <li @click="changeSelectedAlgo('Insertion')">Insertion Sort</li>
      </ul>
    </div>
    <button class="btn-style visualize-btn" @click="Visualize">
      Visualize
    </button>
    <button class="btn-style randomize-btn" @click="randomizeArray">
      Get Random Array
    </button>

    <div class="select-speed select">
      <div class="box btn-style" @click="openSpeedList">
        <p>{{ selectedSpeed }}</p>
        <div class="icon">
          <i class="fas fa-chevron-down"></i>
        </div>
      </div>
      <ul class="ul-list" v-if="isShowingSpeedList">
        <li @click="changeSelectedSpeed('Slow')">Slow</li>
        <li @click="changeSelectedSpeed('Medium')">Medium</li>
        <li @click="changeSelectedSpeed('Fast')">Fast</li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      selectedAlgorithm: "Selection",
      isShowingAlgoList: false,
      selectedSpeed: "Medium",
      isShowingSpeedList: false,
    };
  },
  computed: {
    selectAlgo() {
      return this.selectedAlgorithm + " Sort";
    },
  },
  methods: {
    changeSelectedAlgo(val) {
      this.selectedAlgorithm = val;
      this.isShowingAlgoList = false;
    },
    openAlgoList() {
      this.isShowingAlgoList = !this.isShowingAlgoList;
      this.isShowingSpeedList = false;
    },
    changeSelectedSpeed(val) {
      this.selectedSpeed = val;
      this.isShowingSpeedList = false;
    },
    openSpeedList() {
      this.isShowingSpeedList = !this.isShowingSpeedList;
      this.isShowingAlgoList = false;
    },
    Visualize() {
      this.eventHub.$emit("visualize", {
        selectedAlgorithm: this.selectedAlgorithm,
        selectedSpeed: this.selectedSpeed,
      });
    },
    randomizeArray() {
      this.eventHub.$emit("randomize", null);
    },
  },
};
</script>

<style scoped src="../style/Navbar.css"></style>
