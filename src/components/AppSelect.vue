<template>
  <div class="form-control">
    <label
      class="label"
    > {{ label }} <span v-if="required">*</span>
      <div class="input-control">
        <select
          class="input"
          v-model="data"
        >
          <option disabled value="0" v-if="canShow">Selecione</option>
          <option v-for="item in items" :key="item[itemKey]" :value="item[itemKey]">
            {{ item[itemDisplayProp] }}
          </option>
        </select>
      </div>
    </label>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: ''
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
  computed: {
    canShow () {
      return !this.items.some(item => item.id === 0)
    }
  },
  props: {
    label: { type: String },
    value: { type: Number, default: 0 },
    required: { type: Boolean, default: false },
    border: { type: Boolean, default: false },
    items: { type: Array, default: () => [] },
    itemKey: { type: String, default: 'id' },
    itemDisplayProp: { type: String, default: 'name' }
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

  .label {
    color: white;
    text-shadow: 1px 1px 1px #333;
  }

  .input:focus {
    box-shadow: 3px 3px 3px 0 #333;
  }
</style>
