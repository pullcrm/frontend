import { defineStore } from 'pinia'

import { copyObject } from '~/utils/object'

interface IState {
  activeName: any
  activeProps: any
  question: any
  smsConfirmationInfo: any
}

export const usePopupStore = defineStore('popup', {
  state: (): IState => ({
    activeName: null,
    activeProps: null,
    question: null,

    smsConfirmationInfo: null,
  }),
  getters: {
    isVisible: (state) => {
      return (name: string) => {
        return state.activeName === name
      }
    },
  },
  actions: {
    show(arg: any) {
      if (typeof arg === 'object') {
        const { name, props } = arg

        this.activeName = name
        this.activeProps = copyObject(props)
      }

      if (typeof arg === 'string')
        this.activeName = arg
    },

    hide() {
      this.activeName = null
      this.activeProps = null
    },

    smsConfirmation({ title, subTitle, submit }: any) {
      return new Promise((resolve) => {
        this.smsConfirmationInfo = { title, subTitle, submit, resolve }
      })
    },

    smsConfirmed(result: any) {
      if (!this.smsConfirmationInfo)
        throw new Error('SMS confirmation was not found')

      this.smsConfirmationInfo.resolve(result)

      this.smsConfirmationInfo = null
    },

    askQuestion(question: any) {
      return new Promise((resolve) => {
        this.question = { ...question, resolve }
      })
    },

    answerQuestion(answer: any) {
      if (!this.question)
        throw new Error('Question was not found')

      this.question.resolve(answer)

      this.question = null
    },
  },
})
