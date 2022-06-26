<script lang="ts" setup>
import UiNavigationLink from './NavigationItem.vue'
import type { INavigationItem } from '~/types'

interface IProps {
  value?: string
  navigation: INavigationItem[]
}

const { value = '' } = defineProps<IProps>()

defineEmits(['input'])
</script>

<template>
  <div class="ui-navigation">
    <UiNavigationLink
      v-for="(item, index) in navigation"
      :key="index"
      :item="item"
      :is-active="value === item.name"
      @click="$emit('input', item)"
    />
  </div>
</template>

<style lang="scss">
  .ui-navigation {
    @include hide-scrollbar;

    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
  }
</style>
