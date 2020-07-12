<template>
  <div class="base-layout-companies">
    <div class="base-layout-companies__inner">
      <div
        v-for="approach in approaches"
        class="base-layout-companies__item"
        :key="approach.id"
        @click="onApproach(approach)"
      >
        <div class="base-layout-companies__item-logo">
          <ImagePreviewCircle
            :image="approach.company.logo"
            :name="approach.company.name"
          />
        </div>
        <div class="base-layout-companies__item-info">
          <div class="base-layout-companies__item-name">
            {{ approach.company.name }}
          </div>

          <div class="base-layout-companies__item-text">
            {{ approach.company.category.name }}, в городе {{ approach.company.city.name }}
          </div>
        </div>
      </div>

      <RouterLink
        tag="div"
        :to="{
          name: 'companyCreate'
        }"
        class="base-layout-companies__add-company"
      >
        Добавить компанию
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import ImagePreviewCircle from '@/components/ImagePreviewCircle/ImagePreviewCircle.vue'

@Component({
  components: {
    ImagePreviewCircle
  }
})
export default class Companies extends Vue {
  get approaches () {
    return this.$store.state.approaches.approaches
  }

  async onApproach (approach) {
    this.$store.commit('approaches/SET_CURRENT', approach)

    await this.$store.dispatch('auth/fetchRefreshToken')

    location.reload()
  }
}
</script>

<style lang="scss">
  .base-layout-companies {
    width: 0;
    overflow: hidden;
    transition: width $ui-transition;

    &._has-companies {
      width: 300px;
    }

    &__inner {
      width: 300px;
      height: 100%;
      padding: 24px 16px;
      color: #fff;
      // background: #72a990;
      background: #456e5a;
      border-top-right-radius: 34px;
      border-bottom-right-radius: 34px;
    }

    &__add-company {
      @include ui-typo-14;

      display: flex;
      align-items: center;
      justify-content: center;
      height: 38px;
      color: $ui-black-100;
      background: #fff;
      border-radius: 8px;
      cursor: pointer;
    }

    &__item {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      padding-bottom: 16px;
      border-bottom: 1px solid rgba(#fff, 0.4);
      cursor: pointer;

      &-info {
        padding-left: 16px;
      }

      &-name {
        @include ui-typo-16;
      }

      &-text {
        @include ui-typo-12;
      }
    }
  }
</style>
