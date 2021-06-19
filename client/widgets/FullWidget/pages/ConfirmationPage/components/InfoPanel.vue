<template>
  <UiPanel
    size="s"
    class="full-widget-confirmation-page-info-panel"
  >
    <UiAvatar
      :image="avatar"
      :name="fullName"
      size="m"
      class="full-widget-confirmation-page-info-panel__image"
    />

    <div class="full-widget-confirmation-page-info-panel__info">
      <UiText
        tag="a"
        href="#"
        size="l"
        strong
        responsive
        class="full-widget-confirmation-page-info-panel__procedures"
      >
        {{ proceduresText }}
      </UiText>

      <UiText
        size="m"
        responsive
        class="full-widget-confirmation-page-info-panel__name"
      >
        {{ fullName }}
      </UiText>
    </div>

    <UiText
      size="m"
      class="full-widget-confirmation-page-info-panel__date"
    >
      {{ date }}
    </UiText>

    <UiPrice
      size="s"
      class="full-widget-confirmation-page-info-panel__price"
    >
      {{ price | price }}
    </UiPrice>
  </UiPanel>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    date: {
      type: String,
      required: true
    },

    procedures: {
      type: Array,
      required: true
    },

    specialist: {
      type: Object,
      required: true
    }
  }
})
export default class InfoPanel extends Vue {
  readonly date
  readonly procedures
  readonly specialist

  get user () {
    return this.specialist.user
  }

  get avatar () {
    return this.user.avatar?.path
  }

  get fullName () {
    const { firstName, lastName } = this.user

    return [firstName, lastName]
      .map(item => item.trim())
      .filter(Boolean)
      .join(' ')
  }

  get proceduresText () {
    return this.procedures
      .map(({ name }) => name)
      .join(', ')
  }

  get price () {
    return this.procedures
      .reduce((sum, { price }) => sum + price, 0)
  }
}
</script>

<style lang="scss" src="./InfoPanel.scss"></style>
