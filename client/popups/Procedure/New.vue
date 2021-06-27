<template>
  <UiPopup
    class="procedures-new"
    @close="$emit('close')"
  >
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

import { PROCEDURE_DURATIONS } from '~/constants/time'

import { minutesToTime } from '~/utils/time'

@Component({
  props: {
    category: {
      type: Object,
      default: null
    }
  }
})
export default class ProcedureNew extends Vue {
  readonly category

  form = {
    duration: null,
    category: null
  }

  constructor () {
    super()

    if (this.category) {
      this.form.category = this.category
    }
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

  get categories () {
    return this.$typedStore.state.procedures.categories
  }

  get validations () {
    return {}
  }

  async submit () {
    await this.$typedStore.dispatch(
      'procedures/createProcedure', this.form
    )

    this.$emit('close')
  }
}
</script>

<style lang="scss">
  .procedures-new {
    &__title {
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
