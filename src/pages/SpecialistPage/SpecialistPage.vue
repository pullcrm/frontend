<template>
  <div class="specialist-page">
    <UiContainer narrow>
      <UiBack
        v-if="hasBack"
        class="specialist-page__back"
        @click.native="onBack"
      />

      <UiTitle
        class="specialist-page__title"
        size="l"
        responsive
      >
        {{ specialist.fullName }}
      </UiTitle>

      <RouterView
        :specialist="specialist"
      />
    </UiContainer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class SpecialistPage extends Vue {
  get specialists () {
    return this.$store.state.specialists.specialists
  }

  get specialistId () {
    return Number(this.$route.params.specialistId)
  }

  get specialist () {
    return this.specialists.find(({ id }) => id === this.specialistId)
  }

  get profile () {
    return this.$store.state.company.profile
  }

  get hasBack () {
    return true
  }

  onBack () {
    this.$router.go(-1)
  }
}
</script>

<style lang="scss" src="./SpecialistPage.scss"></style>
