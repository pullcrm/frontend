import { defineStore } from 'pinia'
import { SPECIALIST } from '~/constants/roles'

import { normalizeSpecialists } from '~/logics/specialist'

interface IState {
  specialists: any[]
}

export const useSpecialistsStore = defineStore('specialists', {
  state: (): IState => ({
    specialists: [],
  }),
  getters: {
    specialistsDict: (state) => {
      return state.specialists.reduce((dict, item) => {
        return {
          ...dict,
          [item.id]: item,
        }
      }, {})
    },

    total: (state) => {
      return state.specialists.length
    },

    byId() {
      return (specialistId: number) => {
        return this.specialistsDict[specialistId]
      }
    },
  },
  actions: {
    async fetch() {
      const positionStore = usePositionStore()

      let specialists = []

      const { name: role } = positionStore.role

      if (role === SPECIALIST) {
        const specialist = await this.$api.specialist.get(
          positionStore.currentId,
        )

        specialists = [specialist]
      }
      else {
        specialists = await this.$api.specialist.all({
          sort: 'order',
          order: 'asc',
        })
      }

      this.specialists = normalizeSpecialists(specialists)
    },

    async onUploadAvatar(form: any) {
      const toastsStore = useToastsStore()

      try {
        return await this.$apiClient.upload(form)
      }
      catch (err: any) {
        if (err.status === 400) {
          toastsStore.show({
            type: 'error',
            title: 'Великий розмір файлу. До завантаження доступні файли менше 500Кб',
          })
        }

        throw err
      }
    },
  },
})
