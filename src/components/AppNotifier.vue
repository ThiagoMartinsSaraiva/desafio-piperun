<template>
  <div :class="type" v-if="show">
    <p class="title"><b>{{ title }}</b></p>
    <p class="message">{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, required: true },
    show: { type: Boolean, default: false }
  }
}
</script>

<style scoped>
  div {
    color: white;
    width: 300px;
    height: 130px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: space-around;
    position: fixed;
    top: 10px;
    right: 20px;
    z-index: 4;
    border-radius: 4px;
    font-size: 12px;
  }

  .error {
    background-color: #E53935;
    border: 3px solid #B71C1C;
  }

  .ok {
    background-color: #43A047;
    border: 3px solid #1B5E20;
  }
</style>
