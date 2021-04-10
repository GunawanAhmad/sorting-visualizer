<template>
  <nav class="navbar">
    <div class="select-algo select">
      <span class="tool-tip">Algoritma</span>
      <div class="box btn-style" @click="openAlgoList">
        <p>{{ selectAlgo }}</p>
        <div class="icon">
          <i class="fas fa-chevron-down"></i>
        </div>
      </div>
      <ul class="ul-list" v-if="isShowingAlgoList">
        <li @click="changeSelectedAlgo('Selection')">Selection Sort</li>
        <li @click="changeSelectedAlgo('Insertion')">Insertion Sort</li>
        <li @click="changeSelectedAlgo('Bubble')">Bubble Sort</li>
      </ul>
    </div>
    <button class="btn-style visualize-btn" @click="Visualize">
      Visualisasi
    </button>
    <button class="btn-style randomize-btn" @click="randomizeArray">
      Buat Array Baru
    </button>

    <div class="select-speed select">
      <span class="tool-tip">Kecepatan animasi</span>
      <div class="box btn-style" @click="openSpeedList">
        <p>{{ selectedSpeed }}</p>
        <div class="icon">
          <i class="fas fa-chevron-down"></i>
        </div>
      </div>
      <ul class="ul-list" v-if="isShowingSpeedList">
        <li @click="changeSelectedSpeed('Lambat')">Lambat</li>
        <li @click="changeSelectedSpeed('Sedang')">Sedang</li>
        <li @click="changeSelectedSpeed('Cepat')">Cepat</li>
      </ul>
    </div>
    <div class="theme-toggler">
      <input
        type="checkbox"
        class="checkbox"
        id="checkbox"
        v-model="isDarkTheme"
      />
      <label for="checkbox" class="label" @click="changeTheme">
        <i class="fas fa-moon"></i>
        <i class="fas fa-sun"></i>
        <div class="ball"></div>
      </label>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      selectedAlgorithm: "Selection",
      isShowingAlgoList: false,
      selectedSpeed: "Cepat",
      isShowingSpeedList: false,
      isDarkTheme: true,
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
      this.eventHub.$emit("changeAlgo", val.toLowerCase());
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
    changeTheme() {
      let root = document.querySelector(":root");
      // let rs = getComputedStyle(r);
      if (this.isDarkTheme) {
        root.style.setProperty("--dark", "#eeeeee");
        root.style.setProperty("--white", "#36393e");
        root.style.setProperty("--soft-dark", "#E1E1E1");
      } else {
        root.style.setProperty("--dark", "#36393e");
        root.style.setProperty("--white", "#eeeeee");
        root.style.setProperty("--soft-dark", "#4f5153");
      }
    },
  },
};
</script>

<style scoped src="../style/Navbar.css"></style>
