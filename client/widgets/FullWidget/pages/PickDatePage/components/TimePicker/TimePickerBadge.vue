<template>
  <UiText
    tag="a"
    href="#"
    size="l"
    :class="[
      'full-widget-pick-date-page-time-picker-badge',
      {'full-widget-pick-date-page-time-picker-badge_active': isActive}
    ]"
    @click.native.prevent="onPick"
  >
    {{ normalizeHour }}
  </UiText>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  inject: ['duration'],

  props: {
    hour: {
      type: Object,
      required: true
    }
  }
})
export default class TimePickerBadge extends Vue {
  readonly hour
  readonly duration!: number

  get normalizeHour () {
    return `${this.hour.format('HH:mm')} - ${this.hour.add(this.duration, 'm').format('HH:mm')}`
  }

  get selectedTime () {
    return this.$route.query.time
  }

  get isActive () {
    return this.selectedTime === this.hour.format('HH:mm')
  }

  onPick () {
    this.$router.replace({
      query: {
        ...this.$route.query,
        time: this.hour.format('HH:mm')
      }
    })
  }
}
</script>

<style lang="scss" src="./TimePickerBadge.scss"></style>
