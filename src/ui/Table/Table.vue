<template>
  <div class="ui-table">
    <table
      class="ui-table__inner"
    >
      <thead>
        <tr>
          <UiText
            v-for="column in columns"
            :key="column.name"
            tag="th"
            size="m"
            :align="column.align"
            responsive
            :data-name="column.name"
          >
            {{ column.name }}
          </UiText>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(row, index) in data"
          :key="index"
        >
          <UiText
            v-if="numbered"
            tag="td"
            size="m"
            width="40"
            align="center"
            responsive
            data-name="№"
          >
            #{{ index + 1 }}
          </UiText>

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
    }
  },

  watch: {
    data: {
      handler () {
        this.load()
      },
      immediate: true
    }
  }
})

export default class Table extends Vue {
  readonly data

  columns = []

  async load () {
    await new Promise(requestAnimationFrame)

    this.columns = [...this.$el.querySelector('tbody tr').querySelectorAll('td')]
      .map(({ attributes }) => {
        // @ts-ignore
        const align = attributes.align.value
        const name = attributes['data-name'].value

        return { name, align }
      })
  }
}
</script>

<style lang="scss">
  .ui-table {
    width: 100%;
    margin-bottom: -12px;
    overflow-x: auto;

    &__inner {
      width: 100%;
    }

    thead {
      margin: 0 -8px;

      th {
        display: table-cell;
        padding: 0 8px 12px;
        color: $ui-black-60;
        white-space: nowrap;
        vertical-align: top;
      }
    }

    tbody {
      td {
        display: table-cell;
        padding: 16px 8px;
        vertical-align: middle;
      }

      tr {
        background-color: $ui-white;
        border-top: 1px solid $ui-black-20;
        transition: background-color var(--ui-transition);

        &:hover {
          background-color: $ui-black-10;
        }
      }

      strong {
        font-weight: 500;
      }
    }
  }
</style>
