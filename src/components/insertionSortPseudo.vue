<template>
  <div class="pseudo-code-container">
    <div class="checking">Let's Go !</div>
    <div class="pseudo-code">
      <p class="indent-0 active">set elemen pertama sebagai sorted</p>
      <p class="indent-0">Untuk setiap elemen (i = 1) dalam array lakukan</p>
      <p class="indent-1">Set elemen ke i sebagai current</p>
      <p class="indent-1">
        Untuk setiap elemen (j = i – 1) turun ke 0 DAN jika current &#60; array
        ke j
      </p>
      <p class="indent-2">Tukar elemen(j dan j + 1)</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped src="../style/pseudoCode.css"></style>
