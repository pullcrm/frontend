<template>
  <div class="landing-home-page-intro">
    <img
      class="landing-home-page-intro__logo"
      src="~/assets/logos/logo.svg"
      alt="Pullcrm-logo"
    >

    <UiTitle
      size="xl"
      responsive
      class="landing-home-page-intro__title"
    >
      <Typewritter
        :list="writerList"
        prepend="Учет клиентов для"
      />
    </UiTitle>

    <UiText
      size="l"
      responsive
      class="landing-home-page-intro__sub-title"
    >
      Получите все преимущетсва Pullcrm асболютно бесплатно.
    </UiText>

    <form
      class="landing-home-page-intro__form"
      @submit.prevent="onSubmit"
    >
      <UiFormValidator
        ref="formValidator"
        :validations="validations"
      >
        <template #default="{ resetFieldError, getFieldError }">
          <UiField
            class="landing-home-page-intro__phone"
            :error="getFieldError('phone')"
          >
            <UiInput
              v-model="phone"
              mask="38 (###) #### ###"
              name="phone"
              left-icon="outlined/phone"
              placeholder="Введите номер телефона"
              required
              @input="resetFieldError('phone')"
            />
          </UiField>

          <UiButton
            type="submit"
            size="m"
            theme="blue"
            left-icon="solid/hand-pointing-fill"
            class="landing-home-page-intro__action"
          >
            Попробовать
          </UiButton>
        </template>
      </UiFormValidator>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import UiFormValidator, { Validations } from '~/ui/FormValidator.vue'

import Typewritter from '~/components/Typewriter/Typewriter.vue'

import Container from '../../../components/Container.vue'

@Component({
  components: {
    Container,
    Typewritter
  }
})
export default class Intro extends Vue {
  phone = ''

  $refs: {
    formValidator: UiFormValidator
  }

  get validations (): Validations {
    return {
      phone: {
        rules: {
          min: 10,
          required: true
        },
        messages: {
          min: 'Не верный формат номера',
          required: 'Введите номер телефона'
        },
        serverMessages: {
          invalid: 'Номер телефона введен неверно'
        }
      }
    }
  }

  get writerList () {
    return [
      'барбешопов!'
      // 'салонов красоты!',
      // 'мастеров маникюра!'
    ]
  }

  async onSubmit () {
    const isValid = await this.validate()

    if (!isValid) return

    this.$router.push({
      name: 'registration',
      query: {
        phone: this.phone
      }
    })
  }

  validate () {
    return this.$refs.formValidator.validate({
      phone: this.phone
    })
  }
}
</script>

<style lang="scss" src="./Intro.scss"></style>
