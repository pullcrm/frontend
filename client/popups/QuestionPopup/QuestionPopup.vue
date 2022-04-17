o<template>
  <UiPopup
    class="question-popup"
    @close="$emit('cancel')"
  >
    <form @submit.prevent="onSubmit">
      <UiTitle
        class="question-popup__title"
        size="m"
      >
        {{ question.title }}
      </UiTitle>

      <UiInput
        v-if="hasInput"
        v-model="value"
        :tag="question.input.tag"
        class="question-popup__input"
        v-bind="question.input"
      />

      <div class="question-popup__actions">
        <UiButton
          theme="blue"
          type="submit"
          v-text="acceptButtonTitle"
        />

        <UiButton
          theme="info-outlined"
          @click.native="$emit('cancel')"
          v-text="cancelButtonTitle"
        />
      </div>
    </form>
  </UiPopup>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    question: {
      type: Object,
      required: true
    }
  }
})
export default class QuestionPopup extends Vue {
  readonly question: {
    title: string,
    input?: {
      tag?: 'textarea' | 'input',
      min?: number,
      max?: number,
      type?: string,
      placeholder?: string,
      value?: string
    },
    acceptButtonTitle?: string,
    cancelButtonTitle?: string
  }

  value: number | string = 0

  constructor () {
    super()

    this.value = this.question.input?.value
  }

  get hasInput () {
    return this.question.input
  }

  get acceptButtonTitle () {
    return this.question.acceptButtonTitle || 'ОК'
  }

  get cancelButtonTitle () {
    return this.question.cancelButtonTitle || 'Скасувати'
  }

  onSubmit () {
    if (this.hasInput) {
      this.$emit('submit', this.value)
      return
    }

    this.$emit('ok')
  }
}
</script>

<style lang="scss" src="./QuestionPopup.scss" />
