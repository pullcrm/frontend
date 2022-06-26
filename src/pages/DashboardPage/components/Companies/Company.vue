<script lang="ts" setup>
const props = defineProps({
  position: {
    type: Object,
    required: true,
  },
})

const positionStore = usePositionStore()

const company = computed(() => {
  return props.position.company
})

const logo = computed(() => {
  return company.value.logo?.path
})

const location = computed(() => {
  return [company.value.city.name, company.value.address]
    .filter(Boolean)
    .join(', ')
})

const companyId = computed(() => {
  return positionStore.companyId
})

const isCurrentCompany = computed(() => {
  return company.value.id === companyId.value
})
</script>

<template>
  <UiPanel
    class="dashboard-page-company"
    :class="{ '_active': isCurrentCompany }"
    size="s"
    responsive
  >
    <div class="dashboard-page-company__avatar">
      <UiAvatar
        :image="logo"
        :name="company.name"
        size="m"
      />

      <UiIcon
        v-if="isCurrentCompany"
        name="solid/check-circle-fill"
        size="s"
      />
    </div>

    <UiText
      class="dashboard-page-company__name"
      size="l"
      strong
      responsive
    >
      {{ company.name }}
    </UiText>

    <UiText
      class="dashboard-page-company__type"
      size="m"
      responsive
    >
      {{ company.type.name }}
    </UiText>

    <UiText
      class="dashboard-page-company__address"
      size="m"
      left-icon="solid/map-pin-fill"
      responsive
    >
      {{ location }}
    </UiText>
  </UiPanel>
</template>

<style lang="scss">
  .dashboard-page-company {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 180px;
    cursor: pointer;
    transition: border-color $ui-transition;

    &__avatar {
      display: flex;
      justify-content: space-between;

      .ui-icon {
        color: $ui-blue-brand;
      }

      .ui-avatar {
        &__image,
        &__letter {
          border-radius: 16px;
        }
      }
    }

    &__name {
      margin-top: 12px;
      font-weight: 500;
    }

    &__type {
      color: $ui-black-80;
    }

    &__address {
      margin-top: 12px;

      .ui-icon {
        color: $ui-blue-brand;
      }

      .ui-text__content {
        @include ui-truncate(1);
      }
    }

    &:hover {
      border-color: $ui-blue-brand;
    }

    &._active {
      border-color: $ui-blue-brand;
      box-shadow: 0 0 0 1px $ui-blue-brand;
    }
  }
</style>
