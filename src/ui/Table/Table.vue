<script lang="ts" setup>
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },

  numbered: {
    type: Boolean,
    default: false,
  },
})

watch(
  () => props.data,
  () => load(),
  { immediate: true },
)

const root = ref<HTMLElement | null>(null)

let columns = reactive<any[]>([])

async function load() {
  if (process.env.CLIENT)
    await new Promise(requestAnimationFrame)

  if (props.data.length === 0)
    return

  // TODO: FIXME:
  // @ts-expect-error
  columns = [...root.value.querySelector('tbody tr').querySelectorAll('td')]
    .map(({ attributes }) => {
      const align = attributes.align.value
      const name = attributes['data-name'].value

      return { name, align }
    })
}
</script>

<template>
  <div
    ref="root"
    class="ui-table"
  >
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
