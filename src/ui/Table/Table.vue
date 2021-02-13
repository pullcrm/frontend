<template>
  <div class="ui-table">
    <table
      class="ui-table__inner"
    >
      <thead>
        <tr>
          <th
            v-if="numbered"
            align="left"
            width="50"
          >
            №
          </th>

          <slot name="head">
            <th
              v-for="label in labels"
              :key="label.name"
              :style="label.style"
            >
              {{ label.name }}
            </th>
          </slot>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(row, index) in data"
          :key="index"
        >
          <td
            v-if="numbered"
          >
            <strong>#{{ index + 1 }}</strong>
          </td>

          <slot
            :row="row"
            :index="index"
          />
        </tr>
      </tbody>
    </table>
  </div>
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

    numbered: {
      type: Boolean,
      default: false
    },

    labels: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
})

export default class Table extends Vue {}
</script>

<style lang="scss">
  .ui-table {
    width: 100%;
    overflow-x: auto;

    &__inner {
      width: 100%;
    }

    thead {
      background: $ui-yellow;

      th {
        @include ui-typo-14;

        padding: 8px;
        color: $ui-black-90;
        white-space: nowrap;
        vertical-align: top;
      }
    }

    tbody {
      td {
        @include ui-typo-14;

        padding: 16px 8px;
        vertical-align: middle;
      }

      tr {
        &:not(:last-child) {
          border-bottom: 1px solid $ui-black-20;
        }

        &:hover {
          background: $ui-black-10;
        }
      }

      strong {
        font-weight: 500;
      }
    }
  }
</style>
