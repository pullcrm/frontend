import { getWorkingHours } from '~/utils/time'
import useValidate, { ValidateMaxLength, ValidateRequired } from '~/validation'

interface IForm {
  id?: number | null
  startTime: string
  endTime: string
  specialist: any | null
  description: string
}

const form = ref<IForm>({
  id: null,
  startTime: '',
  endTime: '',
  specialist: null,
  description: '',
})

const workingHours = computed(() => {
  const from = getWorkingHours('06:00', '23:00')

  if (form.value.startTime) {
    return {
      from,
      to: from.slice(from.indexOf(form.value.startTime)),
    }
  }

  return {
    from,
    to: [],
  }
})

const validations = {
  specialist: {
    ...ValidateRequired('Виберіть спеціаліста'),
  },

  startTime: {
    ...ValidateRequired('Вкажіть час початку'),
  },

  endTime: {
    ...ValidateRequired('Вкажіть час завершения'),
  },

  description: {
    ...ValidateMaxLength('Максимальна кількість символів: 255', 255),
  },
}

const v$ = useValidate(validations, form)

export {
  v$,
  form,
  workingHours,
}
