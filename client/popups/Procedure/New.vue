<template>
  <UiPopup
    class="procedures-new"
    @close="$emit('close')"
  >
    <UiBack
      @back="$emit('close')"
    />

    <UiTitle
      class="procedures-new__title"
      size="s"
    >
      Добавить услугу
    </UiTitle>

    <form @submit.prevent="submit">
      <UiFormValidator
        v-slot="{ resetFieldError }"
        ref="formValidator"
        :validations="validations"
      >
        <UiField
          label="Название услуги"
        >
          <UiInput
            v-model="form.name"
            required
            left-icon="outlined/pencil"
            placeholder="Введите название"
            @input="resetFieldError('name')"
          />
        </UiField>

        <UiField
          label="Цена"
        >
          <UiInput
            v-model="form.price"
            type="number"
            required
            left-icon="outlined/pencil"
            placeholder="Укажите цену"
            @input="resetFieldError('price')"
          />
        </UiField>

        <UiField
          label="Длительность"
        >
          <UiSelect
            v-model="duration"
            label-key="name"
            required
            :options="durationList"
            left-icon="outlined/pencil"
            placeholder="Выбрать время"
            @input="resetFieldError('duration')"
          />
        </UiField>

        <UiField
          label="Описание"
        >
          <UiInput
            v-model="form.description"
            tag="textarea"
            name="description"
            placeholder="Добавьте описание"
          />
        </UiField>

        <div class="procedures-new__actions">
          <UiButton
            type="submit"
            size="l"
            theme="blue"
          >
            Добавить услугу
          </UiButton>
        </div>
      </UiFormValidator>
    </form>
  </UiPopup>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { minutesToTime } from '~/utils/time'

import { PROCEDURE_DURATIONS } from '~/constants/time'

@Component({})
export default class ProcedureNew extends Vue {
  form = {
    duration: null
  }

  get duration () {
    return minutesToTime(this.form.duration)
  }

  set duration ($event: any) {
    this.form.duration = $event.value
  }

  get durationList () {
    return PROCEDURE_DURATIONS.map(minutes => {
      return {
        name: minutesToTime(minutes),
        value: minutes
      }
    })
  }

  get validations () {
    return {}
  }

  async submit () {
    await this.$api.procedures.create({
      // @ts-ignore
      name: this.form.name,
      // @ts-ignore
      price: Number(this.form.price),
      // @ts-ignore
      duration: this.form.duration,
      // @ts-ignore
      description: this.form.description
    })

    await this.onBack()
  }

  async onBack () {
    await this.$typedStore.dispatch('procedures/fetch')

    this.$emit('close')
  }
}
</script>

<style lang="scss">
  .procedures-new {
    &__title {
      margin-top: 8px;
      margin-bottom: 24px;
    }

    &__actions {
      margin-top: 24px;

      .ui-button {
        width: 100%;
      }
    }

    .ui-field + .ui-field {
      margin-top: 20px;
    }
  }
</style>
