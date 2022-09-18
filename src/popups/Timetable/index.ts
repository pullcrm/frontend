import useValidate, { ValidateRequired } from 'validation/index'
import { formatDate } from '~/utils/date-time'
import { getWorkingHours } from '~/utils/time'

const validations = {
  startTime: {
    ...ValidateRequired('Вкажіть час початку'),
  },

  endTime: {
    ...ValidateRequired('Вкажіть час завершения'),
  },
}

const form = ref({
  endTime: '',
  startTime: '',
})

const workingHours = computed(() => {
  const from = getWorkingHours('03:00', '23:00')

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

function getFormatDates(dates: Date[]) {
  return dates.map((date: any) => formatDate(date, 'YYYY-MM-DD'))
}

const v$ = useValidate(validations, form)

export {
  v$,
  form,
  workingHours,
  getFormatDates,
}

