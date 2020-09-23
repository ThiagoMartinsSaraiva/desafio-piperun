<template>
  <div id="container">
    <app-menu></app-menu>
    <app-notifier :title="notifier.title" :show="notifier.show" :message="notifier.message" :type="notifier.type" />
    <main id="content">
      <div class="activities-options">
        <div class="filter-activities">
          <div class="input-container">
            <app-input
              label="Data inicial"
              type="date"
              name="startDate"
              v-model="filter.startDate"
              :border="true"
            />
          </div>
          <div class="input-container">
            <app-input
              label="Data final"
              type="date"
              name="endDate"
              v-model="filter.endDate"
              :border="true"
            />
          </div>
        </div>
        <div class="btn-add-container">
          <app-button classes="btn-option" @btn-clicked="$router.push('/activity')" text="Adicionar atividade"/>
        </div>
      </div>
      <activities-list v-if="!isLoading" :items="activities" @activity-removed="removeActivity" @activity-concluded="concludeActivity" />
      <div v-else>
        <app-loading :isLoading="isLoading" />
      </div>
    </main>
  </div>
</template>

<script>
import AppMenu from '../components/AppMenu.vue'
import AppButton from '../components/AppButton.vue'
import AppInput from '../components/AppInput.vue'
import ActivitiesList from '../components/ActivitiesList.vue'
import AppLoading from '../components/AppLoading.vue'
import AppNotifier from '../components/AppNotifier.vue'

import ActivitiesService from '../services/api/activities'

export default {
  components: {
    AppMenu,
    AppButton,
    AppInput,
    ActivitiesList,
    AppLoading,
    AppNotifier
  },
  data () {
    return {
      activities: [],
      filter: {
        startDate: '',
        endDate: ''
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
  watch: {
    filter: {
      handler (val) {
        if (val.startDate && val.endDate) {
          this.filterActivities()
        }
      },
      deep: true
    }
  },
  methods: {
    updateNotifier (title, message, type) {
      this.notifier = { title, message, type, show: true }

      setTimeout(() => {
        this.notifier.show = false
      }, 3000)
    },
    getActivities () {
      this.isLoading = true
      ActivitiesService.list({ with: 'owner' })
        .then(response => {
          this.activities = response.data.data
        })
        .catch(() => {
          this.updateNotifier('Erro', 'Houve um problema ao tentar buscar as Atividades', 'error')
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    removeActivity (id) {
      const activityIndex = this.activities.findIndex(a => a.id === id)
      if (activityIndex < 0) {
        this.updateNotifier('Erro', 'O id da atividade não foi encontrado.', 'error')
      } else {
        this.isLoading = true
        ActivitiesService.remove(id)
          .then(() => {
            this.activities.splice(activityIndex, 1)
            this.updateNotifier('Sucesso', 'Atividade removida com sucesso!', 'ok')
          })
          .catch(() => {
            this.updateNotifier('Erro', 'Houve um problema ao tentar realizar a exclusão da atividade', 'error')
          })
          .finally(() => {
            this.isLoading = false
          })
      }
    },
    concludeActivity ({ date, id }) {
      const activityIndex = this.activities.findIndex(a => a.id === id)
      if (activityIndex < 0) {
        this.updateNotifier('Erro', 'O id da atividade não foi encontrado.', 'error')
      } else {
        this.isLoading = true
        if (this.activities[activityIndex].status !== 2) {
          const data = { delivery_date: date, status: 2 }
          ActivitiesService.update(data, id)
            .then(() => {
              const activity = { ...this.activities[activityIndex], ...data }
              this.activities.splice(activityIndex, 1)
              this.activities.unshift(activity)
              this.updateNotifier('Sucesso', 'Atividade concluída com sucesso!', 'ok')
            })
            .catch(() => {
              this.updateNotifier('Erro', 'Houve um problema ao tentar realizar a conclusão da atividade', 'error')
            })
            .finally(() => {
              this.isLoading = false
            })
        }
      }
    },
    filterActivities () {
      if (this.filter.startDate && this.filter.endDate) {
        this.isLoading = true
        ActivitiesService.list({
          with: 'owner',
          start_at_start: this.filter.startDate,
          start_at_end: this.filter.endDate
        })
          .then(response => {
            this.activities = response.data.data
          })
          .catch(() => {
            this.updateNotifier('Erro', 'Houve um problema ao tentar realizar o filtro das atividades.', 'error')
          })
          .finally(() => {
            this.isLoading = false
          })
      }
    }
  },
  mounted () {
    this.getActivities()
  }
}
</script>

<style scoped>
  #content {
    margin: 20px;
  }

  .filter-activities {
    padding: 10px 0;
    display: flex;
    background-color: #ff285b;
    border-radius: 4px;
    justify-content: space-evenly;
  }

  .input-container {
    width: 48%;
  }

  .btn-add-container {
    margin: 30px 0;
    width: 20%;
    max-width: 450px;
  }

  #container {
    margin-left: 130px;
  }

  @media (max-width: 860px) {
    .filter-activities {
      flex-direction: column;
      align-items: center;
    }

    .input-container {
      width: 90%;
    }

    .btn-add-container {
      width: 50%;
    }
  }

  @media (max-width: 600px) {
    .btn-add-container {
      width: 100%;
    }
  }
</style>
