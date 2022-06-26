import { defineStore } from 'pinia'
import { AVATAR } from '~/constants/files'

interface IState {
  specialist: any | null
  avatars: any[]
}

export const useSpecialistStore = defineStore('specialist', {
  state: (): IState => ({
    specialist: null,
    avatars: [],
  }),
  getters: {},
  actions: {
    async fetch(slug: number) {
      const specialist = await this.$api.specialist.get(slug)

      this.specialist = specialist
    },

    async fetchAvatars() {
      const avatars = await this.$api.files.all(this.specialist.user.id, {
        group: AVATAR,
      })

      this.avatars = avatars
    },
  },
})
