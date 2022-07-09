<script lang="ts" setup>
import useValidate, { ValidatePhone, ValidateRequired } from 'validation/index'
import type { IRegistrationUserParams } from '~/services/api'
import { api } from '~/boot/api'
import { getPhoneNumber } from '~/utils/format-phone'

defineEmits(['close'])

const popupStore = usePopupStore()
const proceduresStore = useProceduresStore()
const specialistsStore = useSpecialistsStore()

const form = ref<IRegistrationUserParams>({
  fullName: '',
  phone: '',
})

const isLoading = ref(false)

const validations = {
  fullName: {
    ...ValidateRequired('Введіть ім\'я та Прізвище'),
  },
  phone: {
    ...ValidatePhone('Не вірний формат номеру'),
    ...ValidateRequired('Введіть номер телефону'),
    // serverMessages: {
    //   invalid: 'Номер телефону введено невірно',
    //   uniq: 'Користувач, за цим номером, вже працює в компанії',
    // },
  },
}

const v$ = useValidate(validations, form)

const specialistsDict = computed(() => {
  return specialistsStore.specialistsDict
})

async function onSubmit() {
  const isValid = await v$.value.$validate()

  if (!isValid)
    return

  try {
    isLoading.value = true

    const { id } = await api.specialist.create({
      phone: getPhoneNumber(form.value.phone),
      fullName: form.value.fullName,
    })

    await specialistsStore.fetch()

    if (proceduresStore.total > 0) {
      const specialist = specialistsDict.value[id]

      return popupStore.show({
        name: 'specialist-procedures',
        props: { specialist },
      })
    }

    popupStore.hide()
  }
  catch (err: any) {
    // TODO: Show errors
    const serverErrors = [
      err.status === 400 && { field: 'phone', error: 'uniq' },
      err.fieldName === 'phone' && { field: 'phone', error: 'invalid' },
    ].filter(Boolean)

    if (serverErrors.length > 0) {
      // this.$refs.formValidator.setServerErrors(serverErrors)
      return
    }

    throw err
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <UiPopup
    class="popup-specialist"
    @close="$emit('close')"
  >
    <div class="popup-specialist__header">
      <UiTitle
        size="s"
      >
        Додати співробітника
      </UiTitle>
    </div>

    <form @submit.prevent="onSubmit">
      <UiFormValidator
        :validate="v$"
      >
        <template #default="{ resetFieldError, getFieldError }">
          <UiField
            label="Ім'я та Прізвище"
            :error="getFieldError('fullName')"
          >
            <UiInput
              v-model="form.fullName"
              name="name"
              placeholder="Введіть Ім'я та Прізвище"
              data-test="form-name"
              @input="resetFieldError('fullName')"
            />
          </UiField>

          <UiField
            label="Телефон"
            :error="getFieldError('phone')"
          >
            <UiInput
              v-model="form.phone"
              mask="+38 (###) #### ###"
              name="phone"
              type="phone"
              inputmode="tel"
              left-icon="outlined/phone"
              placeholder="066"
              @input="resetFieldError('phone')"
            />
          </UiField>

          <div class="popup-specialist__actions">
            <UiButton
              size="l"
              type="submit"
              theme="blue"
              :loading="isLoading"
            >
              Додати співробітника
            </UiButton>
          </div>
        </template>
      </UiFormValidator>
    </form>
  </UiPopup>
</template>

<style lang="scss" src="./Specialist.scss"></style>
