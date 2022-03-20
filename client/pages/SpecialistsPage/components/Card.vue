<template>
  <UiPanel
    :to="{
      name: 'specialistInfo',
      params: { slug: specialist.id }
    }"
    class="specialists-page-card"
  >
    <!-- <a
      href="#"
      class="specialists-page-card__edit"
    >
      <UiIcon
        name="outlined/pencil-simple"
        size="s"
      />
    </a> -->

    <div
      id="hand"
      v-handle
      class="specialists-page-card__hand"
      @click.prevent
    >
      <UiIcon
        name="outlined/hand-grabbing"
        size="s"
      />
    </div>

    <UiIndicator
      class="specialists-page-card__avatar"
      :type="type"
    >
      <UiAvatar
        :image="avatar"
        :name="specialist.fullName"
        size="l"
      />
    </UiIndicator>

    <UiText
      class="specialists-page-card__name"
      size="l"
      strong
    >
      {{ specialist.fullName }}
    </UiText>

    <UiText
      class="specialists-page-card__specialization"
      size="m"
    >
      {{ specialist.specialization }}
    </UiText>

    <UiText
      class="specialists-page-card__phone"
      size="m"
    >
      {{ user.phone | formatPhone }}
    </UiText>
  </UiPanel>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { HandleDirective } from 'vue-slicksort'

import UiIndicator from '~/ui/Indicator.vue'

@Component({
  components: {
    UiIndicator
  },

  props: {
    specialist: {
      type: Object,
      required: true
    }
  },

  directives: {
    handle: HandleDirective
  }
})
export default class Card extends Vue {
  readonly specialist

  get user () {
    return this.specialist.user
  }

  get avatar () {
    return this.user.avatar?.path
  }

  get status () {
    return this.specialist.status
  }

  get type () {
    if (this.status === 'ALL') {
      return 'green'
    }

    if (this.status === 'DASHBOARD') {
      return 'orange'
    }

    return 'gray'
  }
}
</script>

<style lang="scss" src="./Card.scss"></style>
