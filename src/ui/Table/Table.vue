<template>
  <table
    class="ui-table"
  >
    <thead>
      <tr>
        <th v-for="label in labels" :key="label.name" :style="label.style">{{ label.name }}</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="(row, index) in data"
        :key="index"
      >
        <slot
          :row="row"
          :index="index"
        />
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    data: {
      type: Array,
      required: true
    },

    labels: {
      type: Array,
      required: true
    }
  }
})
export default class Table extends Vue {

}
</script>

<style lang="scss">
  .ui-table {
    width: 100%;

    thead {
      background: #edf4fb;

      th {
        @include ui-typo-14;

        padding: 8px 16px;
        color: rgba(#000, 0.7);
        vertical-align: top;
      }
    }

    tbody {
      td {
        padding: 16px;
        vertical-align: middle;
      }

      tr {
        &:not(:last-child) {
          border-bottom: 1px solid $border-color;
        }

        &:hover {
          background: #fafafb;
        }
      }
    }
  }
</style>
