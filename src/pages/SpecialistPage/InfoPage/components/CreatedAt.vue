<script lang="ts" setup>
import { formatDate } from '~/utils/date-time'

defineProps({
  createdAt: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="specialist-info-page-created-at">
    <UiIcon
      size="l"
      name="solid/user-circle-plus-fill"
    />

    <div class="specialist-info-page-created-at__text">
      <UiText
        size="m"
        responsive
      >
        Доданий до компанії
      </UiText>

      <UiText
        size="l"
        responsive
      >
        {{ formatDate(createdAt, 'D MMMM, YYYY') }}
      </UiText>
    </div>
  </div>
</template>

<style lang="scss">
  .specialist-info-page-created-at {
    display: flex;
    align-items: center;
    padding: 10px 16px;
    background: $ui-black-10;
    border-radius: 8px;

    .ui-icon {
      color: $ui-blue-brand;
    }

    &__text {
      flex: 1;
      margin-left: 12px;

      .ui-text {
        &:first-child {
          color: $ui-black-60;
        }
      }
    }
  }
</style>
