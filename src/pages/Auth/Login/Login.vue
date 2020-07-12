<template>
  <Layout>
    <UiForm
      class="auth-login-form"
      title="Авторизация"
      @on-submit="onSubmit"
    >
      <UiFormControl
        label="Телефон"
        name="phone"
        placeholder="+38 (0"
        v-model="phone"
        required
      />

      <UiFormControl
        label="Пароль"
        type="password"
        name="password"
        placeholder="Введите пароль"
        v-model="password"
        required
      />

      <template
        #actions
      >
        <UiButton
          tag="button"
          type="submit"
        >
          Войти
        </UiButton>

        <UiButton
          :to="{
            name: 'registration'
          }"
          outline
        >
          Регистрация
        </UiButton>

        <UiButton
          tag="button"
          text
        >
          Восстановить доступ
        </UiButton>
      </template>
    </UiForm>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Layout from '../Layout/Layout.vue'
import UiForm from '../components/Form.vue'
import UiButton from '../components/Button.vue'
import UiFormControl from '../components/FormControl.vue'

// import api from '@/api'

@Component({
  components: {
    Layout,
    UiForm,
    UiButton,
    UiFormControl
  }
})
export default class Home extends Vue {
  password = ''
  phone = ''

  async onSubmit () {
    try {
      await this.$store.dispatch('auth/login', {
        phone: this.phone,
        password: this.password
      })

      await Promise.all([
        this.$store.dispatch('approaches/fetch'),
        this.$store.dispatch('profile/fetch')
      ])

      if (this.$store.getters['company/current']) {
        await this.$store.dispatch('auth/fetchRefreshToken')

        this.$router.push({
          name: 'home'
        })

        return
      }

      this.$router.push({
        name: 'companyCreate'
      })
    } catch (error) {
      if (error.code === 401) {
        // TODO: refactor
        // this.$buefy.toast.open({
        //   message: 'Не правильный пароль или Емейл'
        // })

        return
      }

      throw error
    }

    // try {
    //   await api.login({
    //     url: 'http://api.pullcrm.com/public/',
    //     project: 'pullcrm',
    //     email: this.phone,
    //     password: this.password
    //   })

    //   this.$router.push({
    //     name: 'calendar'
    //   })
    // } catch (err) {
    //   console.log(err)
    // }
  }
}
</script>

<style lang="scss">
  .auth-login-form {
    .ui-button {
      &:not(:last-child) {
        margin-bottom: 8px;
      }

      &._text {
        @include ui-typo-12;

        color: $ui-black-80;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .login {
    &__reg-link {
      text-align: center;
      text-decoration: underline;
      opacity: 0.8;
    }
  }
</style>
