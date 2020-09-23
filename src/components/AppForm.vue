<template>
  <div id="form-container">
    <form class="form">
      <slot name="inputs"></slot>
    </form>
  </div>
</template>

<style scoped>
  #form-container {
    display: flex;
    background: linear-gradient(to right,#ff5252, #ff285b);
    position: relative;
    min-height: 320px;
    width: 80%;
    padding: 20px;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    box-shadow: 6px 6px 9px 1px #3338;
  }

  .form {
    width: 80%;
  }
</style>
