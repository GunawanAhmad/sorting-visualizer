<template>
  <div
    class="container algo-info"
    @mouseover="pauseInterval = true"
    @mouseleave="pauseInterval = false"
  >
    <div>
      <div class="text">
        <p>
          {{ selectedAlgo.infoList[currIndex] }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    let algoInfo = [
      {
        name: "selection",
        infoList: [
          "Selection sort merupakan teknik sorting yang paling sederhana",
          "Algoritma ini tidak cocok untuk set data dengan jumlah besar karena kompleksitas dari algoritma ini adalah O(n^2) di mana n adalah jumlah item",
          "hal pertama yang akan dilakukan algoritma selection sort adalah menemukan elemen terkecil dalam array kita dan menukarnya (swap) dengan elemen yang ada di posisi pertama, kemudian algoritma ini akan mengulangi hal yang sama lagi yaitu mencari elemen terkecil yang ada di dalam array dan kemudian menukarnya (swap) dengan elemen yang ada di posisi kedua (mengingat elemen di posisi pertama sudah berhasil kita sorting).",
        ],
      },
    ];
    return {
      selectedAlgo: algoInfo[0],
      currIndex: 0,
      pauseInterval: false,
    };
  },
  mounted() {
    setTimeout(() => {
      setInterval(() => {
        if (!this.pauseInterval) {
          if (this.currIndex == this.selectedAlgo.infoList.length - 1) {
            this.currIndex = 0;
            return;
          }
          this.currIndex += 1;
        }
      }, 5000);
    }, 5000);
  },
};
</script>

<style scoped>
.algo-info {
  position: relative;
}
.algo-info:hover {
  cursor: default;
}

.algo-info:hover::before {
  content: "\f08d";
}
.algo-info::before {
  content: "\f128";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  font-size: 1.8rem !important;
}
</style>
