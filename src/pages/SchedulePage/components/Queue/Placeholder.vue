<template>
  <div
    class="schedule-queue-paceholder"
  >
    <div
      class="schedule-queue-paceholder__inner"
      @click="addAppointment"
    >
      <UiText
        size="l"
        left-icon="plus-circle-fill"
      >
        Добавить в очередь
      </UiText>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class QueuePlaceholder extends Vue {
  addAppointment () {
    this.$store.dispatch('popup/show', {
      name: 'appointment-new',
      props: {
        isQueue: true
      }
    })
  }
}
</script>

<style lang="scss">
  .schedule-queue-paceholder {
    padding: 12px;

    &__inner {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 86px;
      color: #cdd0da;
      border: 2px dashed #cdd0da;
      border-radius: 4px;
      cursor: pointer;
    }

    &:hover {
      color: $ui-black-90;
    }
  }
</style>
