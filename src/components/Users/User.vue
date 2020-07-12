<template>
  <div class="ui-user">
    <div
      class="ui-user__inner"
      :class="{'_is-online' : online}"
    >
      <div
        v-if="hasImage"
        class="ui-user__image"
      >
        <img :src="user.avatar" alt="">
      </div>

      <div
        v-else
        class="ui-user__letter"
      >
        <p>{{ firstLetter }}</p>
      </div>
    </div>

    <div
      v-if="extended"
      class="ui-user__info"
    >
      <div class="ui-user__name">
        {{ userName}}
      </div>

      <div class="ui-user__sub-name">
        {{ userSubName}}
      </div>
    </div>

    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { IUser } from '@/services/api/index.ts'

@Component({
  props: {
    user: {
      type: Object,
      required: true
    },

    online: {
      type: Boolean,
      default: false
    },

    extended: {
      type: Boolean,
      default: false
    },

    name: {
      type: String,
      default: undefined
    },

    subName: {
      type: String,
      default: undefined
    }
  }
})
export default class User extends Vue {
  readonly user: IUser
  readonly name: string
  readonly subName: string

  get hasImage () {
    return Boolean(this.user.avatar)
  }

  get userName () {
    return this.name || this.user.firstName
  }

  get userSubName () {
    // TODO: refactor
    return this.subName || 'Барбер'
  }

  get firstLetter () {
    return this.user.firstName[0]
  }
}
</script>

<style lang="scss">
  .ui-user {
    display: flex;
    align-items: center;

    &__info {
      padding-left: 8px;
    }

    &__name {
      @include ui-typo-14;

      margin-bottom: 4px;
      line-height: 1;
    }

    &__sub-name {
      @include ui-typo-14;

      color: rgba(#000, 0.5);
      line-height: 1;
    }

    &__inner {
      width: 44px;
      height: 44px;
      cursor: pointer;

      &._is-online {
        position: relative;

        &::before {
          position: absolute;
          right: 0;
          bottom: 0;
          z-index: 1;
          display: block;
          width: 12px;
          height: 12px;
          background: #34b53a;
          border-radius: 50%;
          content: '';
        }
      }
    }

    &__image {
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: 50%;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__letter {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      background: #fff;
      border: 1px solid #d6d6d6;
      border-radius: 50%;

      p {
        width: 100%;
        font-weight: 400;
        text-align: center;
      }
    }
  }
</style>
