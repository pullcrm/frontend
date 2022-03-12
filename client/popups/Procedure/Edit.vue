<template>
  <UiPopup
    class="procedures-edit"
    @close="$emit('close')"
  >
    <UiTitle
      class="procedures-edit__title"
      size="s"
    >
      Редагувати послугу
    </UiTitle>

    <form @submit.prevent="submit">
      <UiFormValidator
        ref="formValidator"
        :validations="validations"
      >
        <template #default="{ resetFieldError, getFieldError }">
          <UiField
            label="Назва послуги"
            :error="getFieldError('name')"
            required
          >
            <UiInput
              v-model="form.name"
              left-icon="outlined/pencil"
              placeholder="Введіть назву"
              @input="resetFieldError('name')"
            />
          </UiField>

          <UiField
            label="Категорія"
          >
            <UiSelect
              v-model="form.category"
              label-key="name"
              :options="categories"
              placeholder="Вибрати категорію"
              @input="resetFieldError('category')"
            />
          </UiField>

          <UiField
            label="Ціна"
            :error="getFieldError('price')"
            required
          >
            <UiInput
              v-model="form.price"
              type="number"
              left-icon="outlined/pencil"
              placeholder="Вкажіть ціну"
              @input="resetFieldError('price')"
            />
          </UiField>

          <UiField
            label="Тривалість"
            :error="getFieldError('duration')"
            required
          >
            <UiSelect
              v-model="duration"
              label-key="name"
              :options="durationList"
              :clearable="false"
              left-icon="outlined/pencil"
              placeholder="Вибрати час"
              @input="resetFieldError('duration')"
            />
          </UiField>

          <UiField
            label="Спеціалісти"
          >
            <UiMultiSelect
              v-model="selectedSpecialists"
              :options="specialists"
              label-key="fullName"
              placeholder="Вибрати спеціалістів"
            />
          </UiField>

          <UiField
            label="Опис"
            :error="getFieldError('description')"
          >
            <UiInput
              v-model="form.description"
              tag="textarea"
              name="description"
              placeholder="Добавте опис"
              @input="resetFieldError('description')"
            />
          </UiField>

          <div class="procedures-edit__actions">
            <UiButton
              type="submit"
              size="m"
              theme="blue"
              :loading="isLoading"
            >
              Редагувати послугу
            </UiButton>

            <UiButton
              size="m"
              theme="danger-outlined"
              class="procedures-edit__remove"
              :loading="isLoading"
              @click.native="remove"
            >
              Видалити послугу
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
    procedure: {
      type: Object,
      required: true
    }
  }
})
export default class ProcedureEdit extends Vue {
  readonly procedure!: IProcedure

  isLoading = false

  form = this.procedure

  selectedSpecialists = []

  $refs: {
    formValidator: UiFormValidator
  }

  constructor () {
    super()

    this.selectedSpecialists = this.specialists
      .filter(({ procedures }) => {
        return procedures.some(({ id }) => id === this.procedure.id)
      })
  }

  get specialists () {
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

  get validations (): Validations {
    return {
      name: {
        rules: {
          min: 4,
          max: 255,
          required: true
        },
        messages: {
          min: 'Мінімальна кількість символів: 4',
          max: 'Максимальна кількість символів: 255',
          required: 'Введіть назву послуги'
        }
      },

      price: {
        rules: {
          required: true,
          min_value: 0,
          max_value: 99999
        },
        messages: {
          required: 'Вкажіть ціну',
          min_value: 'Мінімальна ціна: 0',
          max_value: 'Максимальна ціна: 99999'
        }
      },

      duration: {
        rules: {
          required: true
        },
        messages: {
          required: 'Вкажіть тривалість послуги'
        }
      },

      description: {
        rules: {
          max: 255
        },
        messages: {
          max: 'Максимальна кількість символів: 255'
        }
      }
    }
  }

  async submit () {
    const isValid = await this.validate()

    if (!isValid) return

    try {
      this.isLoading = true

      await this.$typedStore.dispatch('procedures/updateProcedure', {
        ...this.form,
        specialistIds: this.selectedSpecialists.map(({ id }) => id)
      })

      await Promise.all([
        this.$typedStore.dispatch('procedures/fetch'),
        this.$typedStore.dispatch('specialists/fetch')
      ])

      this.$emit('close')
    } finally {
      this.isLoading = false
    }
  }

  async remove () {
    try {
      this.isLoading = true

      await this.$api.procedures.remove(this.form.id)

      await Promise.all([
        this.$typedStore.dispatch('procedures/fetch'),
        this.$typedStore.dispatch('specialists/fetch')
      ])

      this.$emit('close')
    } finally {
      this.isLoading = false
    }
  }

  validate () {
    return this.$refs.formValidator.validate(this.form)
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
