<template>
  <div id="container">
    <app-notifier :title="notifier.title" :show="notifier.show" :message="notifier.message" :type="notifier.type" />
    <app-form>
      <div slot="inputs" v-if="!isLoading">
        <h1 id="title">Formulário de Atividades</h1>
        <app-input
          label="Título"
          placeholder="Título"
          type="text"
          name="title"
          v-model="data.title"
          :required="true"
        />
        <app-input
          label="Descrição"
          placeholder="Descrição"
          type="text"
          name="description"
          v-model="data.description"
        />
        <app-select
          :items="items.owners"
          label="Responsável"
          v-model="data.owner_id"
          :required="true"
        />
        <app-select
          :items="items.activityTypes"
          label="Tipo"
          v-model="data.activity_type_id"
          :required="true"
        />
        <app-select
          :items="items.status"
          label="Status"
          v-model="data.status"
          :required="true"
        />
        <div class="btn-container">
          <app-button
            text="Enviar"
            type="submit"
            @btn-clicked="submit"
            classes="btn-submit"
          />
          <app-button
            text="Cancelar"
            type="button"
            @btn-clicked="$router.push('/activities')"
            classes="btn-option"
          />
        </div>
      </div>
      <div slot="inputs" v-else>
        <app-loading :isLoading="isLoading" />
      </div>
    </app-form>
  </div>
</template>

<script>
import AppForm from '@/components/AppForm.vue'
import AppInput from '@/components/AppInput.vue'
import AppSelect from '@/components/AppSelect.vue'
import AppButton from '@/components/AppButton.vue'
import AppLoading from '@/components/AppLoading.vue'
import AppNotifier from '@/components/AppNotifier.vue'

import UsersService from '@/services/api/users'
import ActivitiesService from '@/services/api/activities'
import ActivityTypesService from '@/services/api/activityTypes'

export default {
  data () {
    return {
      data: {
        owner_id: 0,
        activity_type_id: 0,
        title: '',
        description: '',
        status: 0
      },
      routeId: this.$route.params.id || 0,
      items: {
        owners: [],
        activityTypes: [],
        status: [
          { id: 0, name: 'Aberto' },
          { id: 1, name: 'Andamento' },
          { id: 2, name: 'Concluído' },
          { id: 3, name: 'Cancelado' },
          { id: 4, name: 'Oculto' }
        ]
      },
      isLoading: false,
      notifier: {
        show: false,
        title: '',
        message: '',
        type: ''
      }
    }
  },
  methods: {
    updateNotifier (title, message, type) {
      this.notifier = { title, message, type, show: true }

      setTimeout(() => {
        this.notifier.show = false
      }, 3000)
    },
    submit () {
      if (this.data.title && this.data.owner_id && this.data.activity_type_id && this.data.status) {
        this.isLoading = true
        if (this.routeId) {
          ActivitiesService.update(this.data, this.routeId)
            .then(() => {
              this.$router.push('/activities')
            })
            .catch(() => {
              this.updateNotifier('Erro', 'Houve um problema ao tentar atualizar a Atividade', 'error')
            })
            .finally(() => {
              this.isLoading = false
            })
        } else {
          ActivitiesService.store(this.data)
            .then(() => {
              this.$router.push('/activities')
            })
            .catch(() => {
              this.updateNotifier('Erro', 'Houve um problema ao tentar inserir a atividade', 'error')
            })
            .finally(() => {
              this.isLoading = false
            })
        }
      } else {
        this.updateNotifier('Erro de validação', 'Verifique os campos obrigatórios', 'error')
      }
    },
    async getItemsData () {
      ActivityTypesService.list()
        .then(response => {
          this.items.activityTypes = response.data.data
        })
        .catch(() => {
          this.updateNotifier('Erro', 'Houve um problema ao tentar buscar as os Tipos de Atividade', 'error')
        })

      UsersService.list()
        .then(response => {
          this.items.owners = response.data.data
        })
        .catch(() => {
          this.updateNotifier('Erro', 'Houve um problema ao tentar buscar os Usuários', 'error')
        })
    },
    async getActivityData () {
      if (this.routeId) {
        ActivitiesService.index(this.routeId)
          .then(response => {
            this.data = { ...response.data.data }
          })
          .catch(() => {
            this.updateNotifier('Erro', 'Houve um problema ao tentar buscar os dados da Atividade', 'error')
          })
      }
    }
  },
  components: {
    AppForm,
    AppInput,
    AppSelect,
    AppButton,
    AppLoading,
    AppNotifier
  },
  mounted () {
    this.isLoading = true
    Promise.all([this.getActivityData(), this.getItemsData()])
      .finally(() => {
        this.isLoading = false
      })
  }
}
</script>

<style scoped>
  #container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  #title {
    color: white;
    margin: 20px 0;
    text-shadow: 1px 1px 3px #333;
  }

  .btn-container {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 10px;
  }

  @media (max-width: 800px) {
    .btn-container {
      width: 100%;
      grid-template-rows: 1fr 1fr;
      row-gap: 10px;
      grid-template-columns: 1fr;
    }
  }
</style>
