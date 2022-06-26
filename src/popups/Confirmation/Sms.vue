<script lang="ts" setup>
import useValidate, { ValidateRequired } from 'validation/index'

interface IProps {
  confirmation: {
    title?: string
    subTitle?: string
    submit: Function
  }
}

const props = defineProps<IProps>()

const emit = defineEmits(['ok', 'cancel'])

const popupStore = usePopupStore()

const form = ref({
  code: '',
})

const serverErrors = ref<any>({})

const validations = {
  code: {
    ...ValidateRequired(''),
  },
}

const v$ = useValidate(validations, form, { serverErrors })

function onInput() {
  if (form.value.code.length === 4)
    submit()
}

async function submit() {
  try {
    const isValid = await v$.value.$validate()

    if (!isValid)
      return

    await props.confirmation.submit(form.value.code)

    emit('ok')

    popupStore.smsConfirmationInfo = null
  }
  catch (err: any) {
    // TODO: its not working
    if (err.code === 400) {
      serverErrors.value = {
        [err.fieldName]: [err.message],
      }

      return
    }

    throw err
  }
}
</script>

<template>
  <UiPopup
    :closable="false"
  >
    <div class="popup-sms-confirmation">
      <UiBack
        @click="$emit('cancel')"
      />

      <UiTitle
        class="popup-sms-confirmation__title"
        size="m"
      >
        {{ confirmation.title }}
      </UiTitle>

      <UiText
        class="popup-sms-confirmation__subtitle"
        size="m"
      >
        {{ confirmation.subTitle }}
      </UiText>

      <form @submit.prevent="submit">
        <UiFormValidator
          :validate="v$"
        >
          <template #default="{ resetFieldError, getFieldError }">
            <UiField
              label="Код підтвердження"
              :error="getFieldError('code')"
            >
              <UiInput
                v-model="form.code"
                mask="####"
                placeholder="****"
                autofocus
                required
                @update:model-value="resetFieldError('code'), onInput()"
              />
            </UiField>
          </template>
        </UiFormValidator>

        <UiButton
          class="popup-sms-confirmation__button"
          type="submit"
          size="l"
          theme="blue"
        >
          Підтвердити
        </UiButton>
      </form>
    </div>
  </UiPopup>
</template>

<style lang="scss">
  .popup-sms-confirmation {
    &__title {
      margin-top: 8px;
    }

    &__subtitle {
      margin: 8px 0 24px;
    }

    &__button {
      width: 100%;
      margin-top: 24px;
    }
  }
</style>
