<script lang="ts" setup>
import UiTabButton from '../TabButton/TabButton.vue'
import UiTabButtonList from '../TabButtonList/TabButtonList.vue'

const props = defineProps({
  initialTab: {
    type: String,
    required: true,
  },

  theme: {
    type: String,
    default: 'primary',
  },

  nav: {
    type: Boolean,
    default: true,
  },

  size: {
    type: String,
    required: true,
  },

  responsive: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['select'])
const slots = useSlots()

// readonly size:
// | 's'
// | 'm'

const activeTab = ref(props.initialTab)

const tabs = computed(() => {
  if (!slots.default)
    return []

  return (slots.default as unknown as any[])
    .filter(vnode => vnode.componentOptions)
    .map((vnode) => {
      const key = vnode.key
      const { title, icon } = vnode.componentOptions.propsData as Record<string, string>

      return { title, key, icon }
    })
})

function selectTab(tabName: string) {
  activeTab.value = tabName

  emit('select', tabName)
}

provide('tabs', { selectTab, activeTab })
</script>

<template>
  <div class="ui-tabs">
    <UiTabButtonList
      v-if="nav && tabs.length > 1"
    >
      <UiTabButton
        v-for="tab in tabs"
        :key="tab.key"
        :size="size"
        strong
        :data-key="tab.key"
        :left-icon="tab.icon"
        :responsive="responsive"
      >
        {{ tab.title }}
      </UiTabButton>
    </UiTabButtonList>

    <slot
      :active-tab="activeTab"
    />
  </div>
</template>

<style lang="scss">
  .ui-tabs {
    display: block;
  }
</style>
