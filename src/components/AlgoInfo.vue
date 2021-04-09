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
    return {
      selectedAlgo: null,
      currIndex: 0,
      pauseInterval: false,
      algoInfo: [
        {
          name: "selection",
          infoList: [
            "Selection sort merupakan salah satu teknik sorting yang paling lambat",
            "Selection sort memiliki kompleksitas waktu O(n^2) dalam segala kasus",
            "Hal pertama yang dilakukan selection sort adalah mencari nilai minimum dari bagian yang belum disortir lalu menukarnya dengan data pertama dari bagian yang belum disortir",
          ],
        },
        {
          name: "insertion",
          infoList: [
            "Insertion sort cukup baik digunakan pada data dengan skala kecil dan ketika data yang digunakan kebanyakan sudah terurut",
            "Insertion sort memiliki komplesitas waktu O(n^2) dalam kasus terburuk dan O(n) dalam kasus terbaik",
            "Ide dari insertion sort adalah seperti mengurutkan kartu, ambil satu data lalu bandingkan dengan data sebelumnya sampai data yang diambil lebih besar dari data sebelumnya. Lakukan hal tersebut pada setiap data pada array",
          ],
        },
        {
          name: "bubble",
          infoList: [
            "Bubble sort memiliki beberapa versi yang berbeda , namun idenya sama.",
            "Versi bubble sort yang paling lambat memiliki kompleksitas waktu O(n^2) dalam setiap kasusnya. Namun ada versi lebih baik yang membuat algoritma ini memiliki kompleksitas waktu O(n) dalam kasus terbaik",
            "Bubble sort mengurutkan data dengan cara membandingkan data dengan data setelahnya secara terus menerus sampai di satu iterasi dimana tidak terjadi perubahan",
          ],
        },
      ],
    };
  },
  mounted() {
    this.selectedAlgo = this.algoInfo[0];
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

    this.eventHub.$on("changeAlgo", (data) => {
      let selectedAlgo = data.toLowerCase();
      if (selectedAlgo == "selection") {
        this.selectedAlgo = this.algoInfo[0];
      } else if (selectedAlgo == "insertion") {
        this.selectedAlgo = this.algoInfo[1];
      } else if (selectedAlgo == "bubble") {
        this.selectedAlgo = this.algoInfo[2];
      }
    });
  },
};
</script>

<style scoped>
.algo-info {
  position: relative;
  padding: 1rem 0;
}
.algo-info:hover {
  cursor: default;
  outline: 2px solid var(--soft-dark);
  border-radius: 5px;
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
