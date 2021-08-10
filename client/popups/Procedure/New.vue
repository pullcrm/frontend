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
        ref="formValidator"
        :validations="validations"
      >
        <template #default="{ resetFieldError, getFieldError }">
          <UiField
            label="Название услуги"
            :error="getFieldError('name')"
            required
          >
            <UiInput
              v-model="form.name"
              left-icon="outlined/pencil"
              placeholder="Введите название"
              @input="resetFieldError('name')"
            />
          </UiField>

          <UiField label="Категория">
            <UiSelect
              v-model="form.category"
              label-key="name"
              :options="categories"
              placeholder="Выбрать категорию"
            />
          </UiField>

          <UiField
            label="Цена"
            :error="getFieldError('price')"
            required
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
            :error="getFieldError('duration')"
            required
          >
            <UiSelect
              v-model="duration"
              label-key="name"
              :options="durationList"
              :clearable="false"
              left-icon="outlined/pencil"
              placeholder="Выбрать время"
              @input="resetFieldError('duration')"
            />
          </UiField>

          <UiField label="Сотрудники">
            <UiMultiSelect
              v-model="selectedSpecialists"
              :options="specialsts"
              label-key="fullName"
              placeholder="Выбрать специалистов"
            />
          </UiField>

          <UiField label="Описание">
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
        </template>
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

import UiFormValidator, { Validations } from '~/ui/FormValidator.vue'

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

  selectedSpecialists = []

  form: Partial<IProcedure> = {
    duration: null,
    category: null
  }

  $refs: {
    formValidator: UiFormValidator
  }

  constructor () {
    super()

    if (this.category) {
      this.form.category = this.category
    }
  }

  get validations (): Validations {
    return {
      name: {
        rules: {
          min: 4,
          max: 255,
          required: true
        },
        messages: {
          min: 'Минимальное количество символов: 4',
          max: 'Максимальное количество символов: 255',
          required: 'Введите название услуги'
        }
      },

      price: {
        rules: {
          required: true,
          min_value: 0,
          max_value: 99999
        },
        messages: {
          required: 'Укажите цену',
          min_value: 'Минимальная цена: 0',
          max_value: 'Максимальная цена: 99999'
        }
      },

      duration: {
        rules: {
          required: true
        },
        messages: {
          required: 'Укажите длительность услуги'
        }
      }
    }
  }

  get specialsts () {
    return this.$typedStore.state.specialists.specialists
  }

  get duration () {
    return minutesToTime(this.form.duration)
  }

  set duration ($event: any) {
    this.form.duration = $event?.value ?? ''
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

  async submit () {
    const isValid = await this.validate()

    if (!isValid) return

    await this.$typedStore.dispatch('procedures/createProcedure', {
      ...this.form,
      specialistIds: this.selectedSpecialists.map(({ id }) => id)
    })

    await this.$typedStore.dispatch('specialists/fetch')

    this.$emit('close')
  }

  validate () {
    return this.$refs.formValidator.validate(this.form)
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
