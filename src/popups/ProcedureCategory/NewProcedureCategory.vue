<script lang="ts" setup>
import useValidate, { ValidateMaxLength, ValidateMinLength, ValidateRequired } from 'validation/index'
import { api } from '~/boot/api'

const emit = defineEmits(['close'])

const name = ref('')
const isLoading = ref(false)

const proceduresStore = useProceduresStore()

const validations = {
  name: {
    ...ValidateRequired('Введіть назву категорії'),
    ...ValidateMaxLength('Максимальна кількість символів: 255', 255),
    ...ValidateMinLength('Мінімальна кількість символів: 4', 4),
  },
}

const v$ = useValidate(validations, { name })

async function submit() {
  const isValid = await v$.value.$validate()

  if (!isValid)
    return

  try {
    isLoading.value = true

    await api.categories.create({
      name: name.value,
      type: 'PROCEDURE',
    })

    await proceduresStore.fetch()

    emit('close')
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <UiPopup
    class="new-procedures-category"
    @close="$emit('close')"
  >
    <UiTitle
      class="new-procedures-category__title"
      size="s"
    >
      Додати категорію
    </UiTitle>

    <form @submit.prevent="submit">
      <UiFormValidator
        :validate="v$"
      >
        <template #default="{ resetFieldError, getFieldError }">
          <UiField
            label="Назва категорії"
            :error="getFieldError('name')"
            required
          >
            <UiInput
              v-model="name"
              left-icon="outlined/pencil"
              placeholder="Введіть назву"
              data-test="form-name"
              @input="resetFieldError('name')"
            />
          </UiField>

          <UiButton
            type="submit"
            size="l"
            theme="blue"
            :loading="isLoading"
          >
            Додати
          </UiButton>
        </template>
      </UiFormValidator>
    </form>
  </UiPopup>
</template>

<style lang="scss">
  .new-procedures-category {
    &__title {
      margin-top: 8px;
      margin-bottom: 24px;
    }

    .ui-button {
      width: 100%;
      margin-top: 24px;
    }

    .ui-field + .ui-field {
      margin-top: 20px;
    }
  }
</style>
