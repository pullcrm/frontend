const actions = {
  async fetchForMonth (_, date) {
    const daysInMonth = date.daysInMonth()

    return await this.$api.analytics.simple({
      startDate: date.format('YYYY-MM-01'),
      endDate: date.format(`YYYY-MM-${daysInMonth}`)
    })
  },

  async fetchForDay (_, date) {
    return await this.$api.analytics.simple({
      startDate: date.format('YYYY-MM-DD'),
      endDate: date.format('YYYY-MM-DD')
    })
  }
}

export default {
  namespaced: true,
  actions
}
