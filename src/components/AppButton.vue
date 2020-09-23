<template>
  <div>
    <button
      :type="type"
      @click.prevent="click"
      :disabled="disabled"
      :class="['btn', classes]"
    >
      {{ text }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    text: { type: String, required: true },
    type: { type: String, default: 'button' },
    classes: { type: String, default: '' },
    disabled: { type: Boolean, default: false }
  },
  methods: {
    click () {
      this.$emit('btn-clicked')
    }
  }
}
</script>

<style scoped>
  .btn {
    border: none;
    border-radius: 3px;
    transition-duration: .3s;
    width: 99%;
    padding: 8px;
  }

  .btn:not([disabled]):hover {
    cursor: pointer;
  }

  .btn-submit {
    background-color: #ff5252;
    color: #fff;
    border: 1.5px solid #fff;
    transition-property: background-color, color, border;
  }

  .btn-submit:not([disabled]):hover, .btn-submit:not([disabled]):focus {
    background-color: #fff;
    color: #ff5252;
    border: 1.5px solid #fff;
  }

  .btn-option {
    background-color: #fff;
    border: 1.4px solid #333;
    transition: all;
    transition-duration: .3s;
  }

  .btn-option:not([disabled]):hover, .btn-option:not([disabled]):focus {
    background-color: #333;
    color: #fff;
  }

</style>
