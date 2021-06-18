<template>
  <a
    href="#"
    :class="[
      'full-widget-date-picker-item',
      {'full-widget-date-picker-item_active': isActive}
    ]"
    @click.prevent="onPick"
  >
    <UiText
      size="l"
      class="full-widget-date-picker-item__day"
    >
      {{ day.format('dd') }}
    </UiText>

    <UiText
      size="l"
      class="full-widget-date-picker-item__date"
    >
      {{ day.format('DD') }}
    </UiText>
  </a>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    day: {
      type: Object,
      required: true
    }
  }
})
export default class DatePickerItem extends Vue {
  readonly day // type dayjs

  get isActive () {
    return this.day.format('YYYY-MM-DD') === this.$route.query.date
  }

  onPick () {
    this.$router.replace({
      query: {
        ...this.$route.query,
        date: this.day.format('YYYY-MM-DD'),
        time: undefined
      }
    })
  }
}
</script>

<style lang="scss" src="./DatePickerItem.scss"></style>
