<template>
  <UiPanel
    size="s"
    class="full-widget-specialist-panel"
    @click.native.prevent="onPick"
  >
    <UiAvatar
      :image="avatar"
      :name="fullName"
      size="m"
      class="full-widget-specialist-panel__image"
    />

    <div class="full-widget-specialist-panel__info">
      <UiText
        tag="a"
        href="#"
        size="l"
        strong
        responsive
        class="full-widget-specialist-panel__name"
      >
        {{ fullName }}
      </UiText>

      <UiText
        v-if="specialist.specialization"
        size="m"
        responsive
        class="full-widget-specialist-panel__specialization"
      >
        {{ specialist.specialization }}
      </UiText>
    </div>

    <a
      href="#"
      class="full-widget-specialist-panel__link"
      @click.prevent.stop
    >
      <UiIcon
        size="m"
        name="outlined/info"
      />
    </a>
  </UiPanel>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    specialist: {
      type: Object,
      required: true
    }
  }
})
export default class SpecialistPanel extends Vue {
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

  async onPick () {
    await this.$router.push({
      name: 'fullWidgetProceduresPage',
      query: {
        ...this.$route.query,
        specialistId: this.specialist.id
      }
    })
  }
}
</script>

<style lang="scss" src="./SpecialistPanel.scss"></style>
