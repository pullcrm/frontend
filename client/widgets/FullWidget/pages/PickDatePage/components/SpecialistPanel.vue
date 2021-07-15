<template>
  <UiPanel
    size="s"
    class="full-widget-pick-date-page-specialist-panel"
  >
    <UiAvatar
      :image="avatar"
      :name="fullName"
      size="m"
      class="full-widget-pick-date-page-specialist-panel__image"
    />

    <div class="full-widget-pick-date-page-specialist-panel__info">
      <UiText
        size="l"
        strong
        responsive
      >
        {{ proceduresText }}
      </UiText>

      <UiText
        size="m"
        responsive
        class="full-widget-pick-date-page-specialist-panel__name"
      >
        {{ fullName }}
      </UiText>
    </div>

    <UiPrice
      size="s"
      class="full-widget-pick-date-page-specialist-panel__price"
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
export default class SpecialistPanel extends Vue {
  readonly procedures
  readonly specialist

  get user () {
    return this.specialist.user
  }

  get avatar () {
    return this.user.avatar?.path
  }

  get fullName () {
    return this.user.fullName
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

<style lang="scss" src="./SpecialistPanel.scss"></style>
