<template>
  <RouterLink
    class="menu-item"
    :to="to"
  >
    <UiIcon
      :name="icon"
      size="s"
    />

    <div class="menu-item__tooltip">
      {{ title }}
    </div>
  </RouterLink>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    to: {
      type: [Object, String],
      required: true
    },

    icon: {
      type: String,
      required: true
    },

    title: {
      type: String,
      required: true
    }
  }
})
export default class MenuItem extends Vue {

}
</script>

<style lang="scss">
  .menu-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    background-color: $ui-black-20;
    border-radius: 16px;

    &__tooltip {
      position: absolute;
      top: 50%;
      left: calc(100% + 10px);
      padding: 5px 10px 4px;
      color: #fff;
      white-space: nowrap;
      background: $ui-black-100;
      border-radius: 4px;
      transform: translateY(-50%);
      visibility: hidden;

      &::before {
        position: absolute;
        top: 50%;
        left: -5px;
        border-color: $ui-black-100;
        border-style: solid;
        border-width: 5px 5px 5px 0;
        border-top-color: transparent;
        border-bottom-color: transparent;
        border-left-color: transparent;
        transform: translateY(-50%);
        content: '';
      }
    }

    &:hover {
      .menu-item__tooltip {
        visibility: visible;
      }
    }

    &.router-link-active,
    &:hover {
      background-color: $ui-green-brand;

      .ui-icon {
        color: #fff;
      }
    }
  }
</style>
