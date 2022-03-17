export function getLocaleDayByAlias (alias) {
  return {
    monday: 'Понеділок',
    tuesday: 'Вівторок',
    wednesday: 'Середа',
    thursday: 'Четвер',
    friday: 'Пʼятниця',
    saturday: 'Субота',
    sunday: 'Неділя'
  }[alias]
}
