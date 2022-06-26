import { defineStore } from 'pinia'
import { groupByCategory, normalizeProcedureParams } from '~/logics/procedures'

interface IState {
  procedures: any[]
  categories: any[]
  grouped: any[]
}

export const useProceduresStore = defineStore('procedures', {
  state: (): IState => ({
    procedures: [],
    categories: [],
    grouped: [],
  }),
  getters: {
    total: (state) => {
      return state.grouped.reduce((acc, { procedures }) => acc + procedures.length, 0)
    },
  },
  actions: {
    async fetch() {
      const [procedures, categories] = await Promise.all([
        this.$api.procedures.all({
          limit: 50,
          sort: 'order',
          order: 'asc',
        }),
        this.$api.categories.all(),
      ])

      this.procedures = procedures || []
      this.categories = categories || []

      this.grouped = groupByCategory(procedures, categories)
    },

    async updateProcedure(procedure: any) {
      return await this.$api.procedures.update(
        procedure.id, normalizeProcedureParams(procedure),
      )
    },

    async createProcedure(procedure: any) {
      await this.$api.procedures.create(
        normalizeProcedureParams(procedure),
      )

      await this.fetch()
    },

    updateGroupByIndex({ procedures, index }: any) {
      const group = {
        ...this.grouped[index],
        procedures,
      }

      this.grouped.splice(index, 1, group)
    },
  },
})

// SET_GROUPED_BY_INDEX(state, { procedures, index }) {
//   const group = {
//     ...state.grouped[index],
//     procedures,
//   }

//   state.grouped.splice(index, 1, group)
// },
