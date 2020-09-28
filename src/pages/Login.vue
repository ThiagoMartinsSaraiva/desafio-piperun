<template>
  <div id="container">
    <app-notifier :title="notifier.title" :show="notifier.show" :message="notifier.message" :type="notifier.type" />
    <app-form v-if="!isLoading">
      <div slot="inputs">
        <app-input
          label="E-mail"
          placeholder="user@email.com"
          type="email"
          name="email"
          v-model="data.email"
        />
        <app-input
          type="password"
          label="Senha"
          placeholder="digite a sua senha"
          name="password"
          v-model="data.password"
        />
        <div class="btn-container">
          <app-button
            text="Acessar"
            type="submit"
            @btn-clicked="login"
            classes="btn-submit"
          />
        </div>
      </div>
    </app-form>
    <div>
      <app-loading :isLoading="isLoading"/>
    </div>
  </div>
</template>

<script>
import AuthService from '../services/api/auth'

import AppInput from '../components/AppInput.vue'
import AppButton from '../components/AppButton.vue'
import AppForm from '../components/AppForm.vue'
import AppLoading from '../components/AppLoading.vue'
import AppNotifier from '../components/AppNotifier.vue'

export default {
  components: {
    AppInput,
    AppButton,
    AppForm,
    AppLoading,
    AppNotifier
  },
  data () {
    return {
      data: {
        email: '',
        password: ''
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
    login () {
      this.isLoading = true
      AuthService.login(this.data)
        .then(() => {
          this.$router.push('/activities')
        })
        .catch(() => {
          this.notifier.show = true
          this.notifier.title = 'Erro'
          this.notifier.message = 'Houve um problema ao tentar realizar o login'
          this.notifier.type = 'error'
          setTimeout(() => {
            this.notifier.show = false
          }, 3000)
        })
        .finally(() => {
          this.isLoading = false
        })
    }
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

  .btn-container {
    width: 33%;
  }

  @media (max-width: 600px) {
    .btn-container {
      width: 100%;
    }
  }

  @media (min-width: 601px) and (max-width: 900px) {
    .btn-container {
      width: 50%;
    }
  }
</style>
