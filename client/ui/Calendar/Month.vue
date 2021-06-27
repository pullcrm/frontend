<template>
  <UiText
    class="ui-calendar-month"
    size="l"
    responsive
  >
    <template #prepend>
      <UiIcon
        name="outlined/caret-left"
        size="s"
        @click.native="prevMonth"
      />
    </template>

    {{ value.format('MMMM YYYY') }}

    <template #append>
      <UiIcon
        name="outlined/caret-right"
        size="s"
        @click.native="nextMonth"
      />
    </template>
  </UiText>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    value: {
      type: Object,
      required: true
    }
  }
})
export default class Month extends Vue {
  readonly value!: any

  prevMonth () {
    this.$emit('input', this.value.subtract(1, 'month'))
  }

  nextMonth () {
    this.$emit('input', this.value.add(1, 'month'))
  }
}
</script>

<style lang="scss">
  .ui-calendar-month {
    padding: 2px 0;
    text-align: center;
    text-transform: capitalize;

    .ui-icon {
      cursor: pointer;
    }
  }
</style>
