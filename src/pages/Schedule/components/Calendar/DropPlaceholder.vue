<template>
  <div
    v-if="isVisible"
    class="schedule-drop-placeholder"
    :class="{'_active': dragZoneOver}"
    :style="gridArea"
  >
    <div class="schedule-drop-placeholder__inner" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { slugFromTime } from '@/utils/time'

@Component({})
export default class DropPlaceholder extends Vue {
  get isVisible () {
    return this.$store.getters['drugAndDrop/isDragged']
  }

  get dragZone () {
    return this.$store.state.drugAndDrop.dragZone
  }

  get dragZoneOver () {
    return this.$store.state.drugAndDrop.dragZoneOver
  }

  get dropTimeObject () {
    return this.$store.getters['drugAndDrop/dropTimeObject']
  }

  get gridArea () {
    return {
      gridColumn: `employee-${this.dragZone.employeeId}-start / employee-${this.dragZone.employeeId}-end`,
      gridRow: `${slugFromTime(this.dropTimeObject.from)}-start / ${slugFromTime(this.dropTimeObject.to)}-start`
    }
  }
}
</script>

<style lang="scss">
  .schedule-drop-placeholder {
    z-index: 5;
    padding: 8px;

    &__inner {
      height: 100%;
      border: 2px dashed $ui-blue-light-brand;
    }

    &._active {
      .schedule-drop-placeholder {
        &__inner {
          background: rgba($ui-blue-light-brand, 0.1);
        }
      }
    }
  }
</style>
