<template>
  <div class="loader" v-if="isLoading">
    <p>Loading...</p>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: { type: Boolean, default: false, required: true }
  }
}
</script>

<style scoped>
  .loader {
    color: black;
  }
</style>
