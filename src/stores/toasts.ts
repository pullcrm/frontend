import { defineStore } from 'pinia'
import { generateId } from '~/utils/generate-id'
import { getIconByType } from '~/utils/icon-by-type'

interface IState {
  toasts: any[]
}

export const useToastsStore = defineStore('toasts', {
  state: (): IState => ({
    toasts: [],
  }),
  getters: {
    has() {
      return (toastId: number) => {
        const toast = this.byId(toastId)

        return Boolean(toast)
      }
    },

    byId: state => (toastId: number) => {
      return state.toasts.find(toast => toast.id === toastId)
    },
  },
  actions: {
    show({ type = 'success', timeout = 5000, ...payload }) {
      if (['success', 'warning', 'info', 'error'].includes(type)) {
        const toast = {
          id: generateId(),
          type,
          props: {
            title: payload.title,
            theme: type,
            timeout,
            leftIcon: getIconByType(type),
          },
        }

        this.toasts = [...this.toasts.splice(0, 2), toast]
      }
    },

    close(toastId: number) {
      this.toasts = this.toasts.filter(toast => toast.id !== toastId)
    },
  },
})
