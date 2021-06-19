<template>
  <UiPopup
    class="procedures-edit"
    @close="$emit('close')"
  >
    <UiTitle
      class="procedures-edit__title"
      size="s"
    >
      Редактировать услугу
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
            left-icon="outlined/pencil"
            placeholder="Введите название"
            @input="resetFieldError('name')"
          />
        </UiField>

        <UiField
          label="Категория"
        >
          <UiSelect
            v-model="form.category"
            label-key="name"
            :options="categories"
            placeholder="Выбрать категорию"
            @input="resetFieldError('category')"
          />
        </UiField>

        <UiField
          label="Цена"
        >
          <UiInput
            v-model="form.price"
            type="number"
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

        <div class="procedures-edit__actions">
          <UiButton
            type="submit"
            size="m"
            theme="blue"
          >
            Редактировать услугу
          </UiButton>

          <UiButton
            size="m"
            theme="danger-outlined"
            class="procedures-edit__remove"
            @click.native="remove"
          >
            Удалить услугу
          </UiButton>
        </div>
      </UiFormValidator>
    </form>
  </UiPopup>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { PROCEDURE_DURATIONS } from '~/constants/time'

import { IProcedure } from '~/services/api'

import { minutesToTime } from '~/utils/time'

@Component({
  props: {
    procedure: {
      type: Object,
      required: true
    }
  }
})
export default class ProcedureEdit extends Vue {
  readonly procedure!: IProcedure

  form = this.procedure

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

  get categories () {
    return this.$typedStore.state.procedures.categories
  }

  get validations () {
    return {}
  }

  async submit () {
    await this.$typedStore.dispatch(
      'procedures/updateProcedure', this.form
    )

    this.$emit('close')
  }

  async remove () {
    await this.$api.procedures.remove(this.form.id)
    await this.$typedStore.dispatch('procedures/fetch')

    this.$emit('close')
  }
}
</script>

<style lang="scss">
  .procedures-edit {
    &__title {
      margin-bottom: 24px;
    }

    &__actions {
      margin-top: 24px;

      .ui-button {
        width: 100%;
      }
    }

    &__remove {
      margin-top: 16px;
    }

    .ui-field + .ui-field {
      margin-top: 20px;
    }
  }
</style>
