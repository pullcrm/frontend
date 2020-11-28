<template>
  <UiPanel
    class="staff-page-card"
  >
    <UiAvatar
      class="staff-page-card__avatar"
      :image="avatar"
      :name="user.firstName"
      size="l"
    />

    <div class="staff-page-card__info">
      <UiText
        class="staff-page-card__name"
        size="s"
      >
        {{ user.firstName }} {{ user.lastName }}
      </UiText>

      <UiText
        class="staff-page-card__phone"
        size="s"
      >
        {{ user.phone | formatPhone }}
      </UiText>
    </div>

    <UiButton
      size="m"
      theme="green"
      @click.native="$emit('edit')"
    >
      Изменить
    </UiButton>
  </UiPanel>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    user: {
      type: Object,
      required: true
    }
  }
})
export default class Card extends Vue {
  readonly user

  get avatar () {
    return this.user.avatar?.path
  }
}
</script>

<style lang="scss">
  .staff-page-card {
    // FIXME:
    &.ui-panel {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__info {
      margin: 16px 0;
      text-align: center;
    }

    &__name {
      margin-bottom: 4px;
      font-weight: 500;
    }

    &__phone {
      color: $ui-black-80;
    }
  }
</style>
