<script lang="ts" setup>
import useValidate, { ValidateMaxLength, ValidateMaxValue, ValidateMinLength, ValidateMinValue, ValidateRequired } from 'validation/index'
import { api } from '~/boot/api'
import { PROCEDURE_DURATIONS } from '~/constants/time'
import type { IProcedure } from '~/services/api'
import { minutesToTime } from '~/utils/time'

interface IProps {
  procedure: IProcedure
}

const props = defineProps<IProps>()
const emit = defineEmits(['close'])

const proceduresStore = useProceduresStore()
const specialistsStore = useSpecialistsStore()

const isLoading = ref(false)

const form = ref<IProcedure>({ ...props.procedure })

const selectedSpecialists = ref<number[]>([])

selectedSpecialists.value = specialistsStore.specialists
  .filter(({ procedures: items }) => {
    return items.some(({ id }: any) => id === props.procedure.id)
  })

const duration = computed({
  get() {
    return minutesToTime(form.value.duration)
  },

  set($event: any) {
    form.value.duration = $event?.value ?? ''
  },
})

const durationList = computed(() => {
  return PROCEDURE_DURATIONS.map((minutes) => {
    return {
      name: minutesToTime(minutes),
      value: minutes,
    }
  })
})

const categories = computed(() => {
  return proceduresStore.categories
})

const validations = {
  name: {
    ...ValidateRequired('Введіть назву послуги'),
    ...ValidateMinLength('Мінімальна кількість символів: 4', 4),
    ...ValidateMaxLength('Максимальна кількість символів: 255', 255),
  },

  price: {
    ...ValidateRequired('Вкажіть ціну'),
    ...ValidateMinValue('Мінімальна ціна: 0', 0),
    ...ValidateMaxValue('Максимальна ціна: 99999', 99999),
  },

  duration: {
    ...ValidateRequired('Вкажіть тривалість послуги'),
  },

  description: {
    ...ValidateMaxLength('Максимальна кількість символів: 255', 255),
  },
}

const v$ = useValidate(validations, form)

async function submit() {
  const isValid = await v$.value.$validate()

  if (!isValid)
    return

  try {
    isLoading.value = true

    await proceduresStore.updateProcedure({
      ...form.value,
      specialistIds: selectedSpecialists.value.map(({ id }: any) => id),
    })

    await Promise.all([
      proceduresStore.fetch(),
      specialistsStore.fetch(),
    ])

    emit('close')
  }
  finally {
    isLoading.value = false
  }
}

async function remove() {
  try {
    isLoading.value = true

    await api.procedures.remove(form.value.id)

    await Promise.all([
      proceduresStore.fetch(),
      specialistsStore.fetch(),
    ])

    emit('close')
  }
  finally {
    isLoading.value = false
  }
}
</script>

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
        :validate="v$"
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
              data-test="form-name"
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
              data-test="form-categories-select"
              @update:model-value="resetFieldError('category')"
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
              data-test="form-price"
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
              @update:model-value="resetFieldError('duration')"
            />
          </UiField>

          <UiField
            label="Спеціалісти"
          >
            <UiMultiSelect
              v-model="selectedSpecialists"
              :options="specialistsStore.specialists"
              label-key="fullName"
              placeholder="Вибрати спеціалістів"
              data-test="form-specialists-multi-select"
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
              placeholder="Додайте опис"
              data-test="form-description"
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
              @click="remove"
            >
              Видалити послугу
            </UiButton>
          </div>
        </template>
      </UiFormValidator>
    </form>
  </UiPopup>
</template>

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
