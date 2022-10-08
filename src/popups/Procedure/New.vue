<script lang="ts" setup>
import useValidate, { ValidateMaxLength, ValidateMaxValue, ValidateMinLength, ValidateMinValue, ValidateRequired } from 'validation/index'
import { PROCEDURE_DURATIONS } from '~/constants/time'
import type { IProcedure } from '~/services/api'
import { minutesToTime } from '~/utils/time'

const props = defineProps({
  category: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['close'])

const proceduresStore = useProceduresStore()
const specialistsStore = useSpecialistsStore()

const isLoading = ref(false)

const selectedSpecialists = ref([])

// Partial<IProcedure>
const form = ref({
  name: '',
  price: '',
  duration: null,
  description: '',
  category: props.category,
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

const duration = computed({
  get() {
    return minutesToTime(form.value.duration || 0)
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

async function submit() {
  const isValid = await v$.value.$validate()

  if (!isValid)
    return

  try {
    isLoading.value = true

    await proceduresStore.createProcedure({
      ...form.value,
      specialistIds: selectedSpecialists.value.map(({ id }) => id),
    })

    await specialistsStore.fetch()

    emit('close')
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <UiPopup
    class="procedures-new"
    @close="$emit('close')"
  >
    <UiTitle
      class="procedures-new__title"
      size="s"
    >
      Додати послугу
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

          <UiField label="Категорія">
            <UiSelect
              v-model="form.category"
              label-key="name"
              :options="categories"
              data-test="form-categories-select"
              placeholder="Вибрати категорію"
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

          <UiField label="Спеціалісти">
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

          <div class="procedures-new__actions">
            <UiButton
              type="submit"
              size="l"
              theme="blue"
              :loading="isLoading"
            >
              Додати послугу
            </UiButton>
          </div>
        </template>
      </UiFormValidator>
    </form>
  </UiPopup>
</template>

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
