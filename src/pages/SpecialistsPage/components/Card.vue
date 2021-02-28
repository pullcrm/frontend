<template>
  <UiPanel
    class="specialists-page-card"
  >
    <a
      href="#"
      class="specialists-page-card__edit"
      @click.prevent="open"
    >
      <UiIcon
        name="outlined/pencil-simple"
        size="m"
      />
    </a>

    <!-- <div class="specialists-page-card__hand">
      <UiIcon
        name="outlined/hand-grabbing"
        size="m"
      />
    </div> -->

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
      v-if="specialist.specialization"
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

import UiIndicator from '@/ui/Indicator.vue'

@Component({
  components: {
    UiIndicator
  },

  props: {
    specialist: {
      type: Object,
      required: true
    }
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
      return 'blue'
    }

    return 'gray'
  }

  async open () {
    this.$router.push({
      name: 'specialistInfo',
      params: {
        specialistId: this.specialist.id
      }
    })
  }
}
</script>

<style lang="scss" src="./Card.scss"></style>
