import { defineStore } from 'pinia'

interface IState {
  // order: any
  company: any | null
  // procedures: any[]
  categories: any[]
  specialist: null | any
  specialists: any[]
}

export const useWidgetStore = defineStore('widget', {
  state: (): IState => ({
    // order: {},
    company: null,
    // procedures: [],
    categories: [],
    specialist: null,
    specialists: [],
  }),
  getters: {},
  actions: {
    async fetchCompany(companyId: number) {
      const company = await this.$api.public.companyById(companyId)

      this.company = company
    },

    async fetchSpecialists() {
      const specialists = await this.$api.public.specialistsByCompanyId({
        sort: 'order',
        order: 'asc',
        companyId: this.company.id,
      })

      this.specialists = specialists
    },

    async fetchSpecialist(specialistId: number) {
      const specialist = await this.$api.public.specialistById(specialistId)

      this.specialist = specialist
    },

    async fetchCategories() {
      const categories = await this.$api.public.categories({
        companyId: this.company.id,
      })

      this.categories = categories
    },

    // async fetch(companyId: number) {
    //   const [company, procedures, specialists] = await Promise.all([
    //     this.$api.public.companyById(companyId),
    //     this.$api.public.proceduresByCompanyId({ companyId }),
    //     this.$api.public.specialistsByCompanyId({
    //       sort: 'order',
    //       order: 'asc',
    //       companyId,
    //     }),
    //   ])

    //   this.company = company
    //   this.procedures = procedures
    //   this.specialists = specialists
    // },
  },
})

// interface IOrder {
//   date?: any
//   startTime?: string
//   procedure?: any
//   specialist?: any
// }
