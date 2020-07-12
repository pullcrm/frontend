<template>
  <UiForm
    class="auth-company-create-step-third"
    title="Создание компании"
    sub-title="шаг 3 из 3"
    @on-submit="onSubmit"
  >
    <b-field
      v-if="procedures.length > 0"
      grouped
      group-multiline
    >
      <div
        v-for="(procedure, index) in procedures"
        :key="index"
        class="control"
      >
        <b-tag
          type="is-primary"
          attached
          closable
          @click.native="onDelete(procedure)"
        >
          {{ procedure }}
        </b-tag>
      </div>
    </b-field>

    <template
      #actions
    >
      <UiButton
        outline
      >
        Добавить услугу
      </UiButton>

      <UiButton
        tag="button"
        type="submit"
      >
        Начать работу
      </UiButton>
    </template>
  </UiForm>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import UiForm from '../../components/Form.vue'
import UiButton from '../../components/Button.vue'

@Component({
  components: {
    UiButton,
    UiForm
  }
})
export default class StepThird extends Vue {
  // service = {}
  procedures = []

  // onAdd () {
  //   this.procedures.push(this.service)

  //   this.service = {}
  // }

  // onDelete ({ name }) {
  //   const index = this.procedures.findIndex(service => service.name === name)

  //   this.procedures.splice(index, 1)
  // }

  onSubmit () {
    // const procedures = this.services.map(service => ({
    //   name: service.name,
    //   price: service.price,
    //   duration: durationFromTime(service)
    // }))

    this.$router.push({
      name: 'home'
    })
  }
}
</script>

<style lang="scss">
  .auth-company-create-step-third {
    .ui-button {
      &:not(:last-child) {
        margin-bottom: 8px;
      }
    }
  }
</style>
