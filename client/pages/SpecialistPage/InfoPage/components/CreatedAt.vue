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
        Добавлен в компанию
      </UiText>

      <UiText
        size="l"
        responsive
      >
        {{ createdAt | formatDate('D MMMM, YYYY') }}
      </UiText>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    createdAt: {
      type: String,
      required: true
    }
  }
})
export default class CreatedAt extends Vue {
  readonly createdAt: string
}
</script>

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
