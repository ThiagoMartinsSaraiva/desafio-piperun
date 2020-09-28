<template>
  <div id="table-container">
    <table id="table">
      <thead class="table-head">
        <tr class="table-row-header">
          <th class="table-header">Título</th>
          <th class="table-header">Descrição</th>
          <th class="table-header">Responsável</th>
          <th class="table-header">Data</th>
          <th class="table-header">Opções</th>
        </tr>
      </thead>
      <tbody v-if="items.length > 0" class="table-body">
        <tr v-for="item in items" :key="item.id" :class="['table-row-data', { 'completed': item.status === 2 }]">
          <td class="table-data">{{ item.title }}</td>
          <td class="table-data" v-html="item.description"></td>
          <td class="table-data">{{ item.owner.name }}</td>
          <td class="table-data">{{ item.start_at | format-date }}</td>
          <td class="table-data">
            <app-button classes="btn-option" @btn-clicked="$router.push(`/activity/${item.id}`)" text="Editar"></app-button>
            <app-button classes="btn-option" :disabled="item.status === 2" @btn-clicked="conclude(item.id)" text="Concluir"></app-button>
            <app-button classes="btn-option" @btn-clicked="remove(item.id)" text="Excluir"></app-button>
          </td>
        </tr>
      </tbody>
      <tr v-else id="no-data">
        <td colspan="5">Lista vazia</td>
      </tr>
    </table>
  </div>
</template>

<script>
import AppButton from '../components/AppButton'

export default {
  props: {
    items: { type: Array, default: () => [] }
  },
  components: {
    AppButton
  },
  methods: {
    conclude (id) {
      const d = new Date()
      const date = d.toJSON().replace('T', ' ').split('').splice(0, d.toJSON().indexOf('.')).join('')
      this.$emit('activity-concluded', { date, id })
    },
    remove (id) {
      this.$emit('activity-removed', id)
    }
  }
}
</script>

<style scoped>
  #table-container {
    overflow-x: auto;
  }

  #table {
    width: 100%;
    border-spacing: 0 5px;
    border-radius: 4px;
    background-color: #333;
  }

  #no-data {
    color: #fff;
    text-align: center;
    width: 100%;
    height: 60px;
    margin: 0 auto;
    background-color: #333;
  }

  .table-header {
    color: #fff;
    padding: 15px 5px;
    text-align: left;
  }

  .table-row-data:nth-of-type(even) {
    background-color: #fff;
  }

  .table-row-data:nth-of-type(odd) {
    background-color: #eee;
  }

  .table-data {
    padding: 5px;
    vertical-align: initial;
  }

  .completed {
    text-decoration: line-through;
  }

  .completed .table-data {
    background-color: #7CB342;
  }
</style>
