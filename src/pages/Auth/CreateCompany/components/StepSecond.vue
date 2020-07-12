<template>
  <UiForm
    class="auth-company-create-step-second"
    title="Создание компании"
    sub-title="шаг 2 из 3"
    @on-submit="onSubmit"
  >
    <b-field
      v-if="users.length > 0"
      grouped
      group-multiline
    >
      <div
        v-for="(user, index) in users"
        :key="index"
        class="control"
      >
        <b-tag
          type="is-primary"
          attached
          closable
          @click.native="onDelete(user)"
        >
          {{ user }}
        </b-tag>
      </div>
    </b-field>

    <template
      #actions
    >
      <UiButton
        outline
      >
        Добавить сотрудника
      </UiButton>

      <UiButton
        tag="button"
        type="submit"
      >
        Продолжить
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
export default class StepSecond extends Vue {
  email = ''
  users = []

  onAdd () {
    this.users.push(this.email)

    this.email = ''
  }

  onDelete (user) {
    const index = this.users.findIndex(usr => usr === user)

    this.users.splice(index, 1)
  }

  onSubmit () {
    const employee = this.users.map(email => ({ email }))

    this.$emit('submit', employee)
  }
}
</script>

<style lang="scss">
  .auth-company-create-step-second {
    .ui-button {
      &:not(:last-child) {
        margin-bottom: 8px;
      }
    }
  }
</style>
