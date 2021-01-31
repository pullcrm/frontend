<template>
  <UiPanel
    class="dashboard-page-company"
    :class="{'_active' : isCurrentCompany }"
    size="s"
    responsive
  >
    <div class="dashboard-page-company__avatar">
      <UiAvatar
        :image="logo"
        :name="company.name"
        size="l"
        type="rounded"
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
      class="dashboard-page-company__category"
      size="m"
      responsive
    >
      {{ company.category.name }}
    </UiText>

    <UiText
      class="dashboard-page-company__city"
      size="m"
      left-icon="solid/map-pin-fill"
      responsive
    >
      {{ company.city.name }}
    </UiText>
  </UiPanel>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    company: {
      type: Object,
      required: true
    }
  }
})
export default class Company extends Vue {
  readonly company

  get logo () {
    return this.company.logo?.path
  }

  get currentCompany () {
    return this.$store.getters['company/current']
  }

  get isCurrentCompany () {
    return this.company.id === this.currentCompany.id
  }
}
</script>

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
        color: $ui-brand-blue;
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
      font-weight: bold;
    }

    &__category {
      color: $ui-black-80;
    }

    &__city {
      margin-top: 12px;

      .ui-icon {
        color: $ui-brand-blue;
      }
    }

    &:hover {
      border-color: $ui-brand-blue;
    }

    &._active {
      border-color: $ui-brand-blue;
      box-shadow: 0 0 0 1px $ui-brand-blue;
    }
  }
</style>
