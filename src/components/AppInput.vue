<template>
  <div class="form-control">
    <label
      class="label"
    > {{ label }} <span v-if="required">*</span>
      <div class="input-control">
        <input
          :type="type"
          :placeholder="placeholder"
          :name="name"
          v-model="data"
          class="input"
          :required="required"
          :style="{ border: border ? '1px solid black' : 'none' }"
        >
      </div>
    </label>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: '',
      error: false
    }
  },
  watch: {
    value (val) {
      this.data = val
    },
    data (val) {
      this.$emit('input', val)
    }
  },
  props: {
    name: { type: String },
    type: { type: String, default: 'text' },
    placeholder: { type: String },
    label: { type: String },
    value: { type: String, default: '' },
    required: { type: Boolean, default: false },
    border: { type: Boolean, default: false }
  },
  mounted () {
    this.data = this.value
  }
}
</script>

<style scoped>
  .form-control {
    display: flex;
    justify-items: center;
    width: 100%;
  }

  .label {
    width: 100%;
  }

  .input {
    border: none;
    height: 35px;
    border-radius: 4px;
    width: 99%;
    font-size: 16px;
    padding: 8px;
    margin: 5px 0 20px 0;
  }

  .input:focus {
    box-shadow: 3px 3px 3px 0 #333;
  }

  .label {
    color: white;
    text-shadow: 1px 1px 1px #333;
  }
</style>
