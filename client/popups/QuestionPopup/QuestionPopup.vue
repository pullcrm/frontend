o<template>
  <UiPopup
    class="question-popup"
    @close="$emit('cancel')"
  >
    <UiTitle
      class="question-popup__title"
      size="m"
    >
      {{ question.title }}
    </UiTitle>

    <div class="question-popup__actions">
      <UiButton
        theme="blue"
        @click.native="$emit('ok')"
        v-text="acceptButtonTitle"
      />

      <UiButton
        theme="info-outlined"
        @click.native="$emit('cancel')"
        v-text="cancelButtonTitle"
      />
    </div>
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
    acceptButtonTitle?: string,
    cancelButtonTitle?: string
  }

  get acceptButtonTitle () {
    return this.question.acceptButtonTitle || 'ОК'
  }

  get cancelButtonTitle () {
    return this.question.cancelButtonTitle || 'Скасувати'
  }
}
</script>

<style lang="scss" src="./QuestionPopup.scss" />
