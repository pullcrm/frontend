<template>
  <div
    class="schedule-page"
  >
    <UiContainer>
      <Sidebar
        class="schedule-page__sidebar"
        :class="[
          {'_opened': sidebarOpened}
        ]"
      />

      <SidebarButton
        @click.native="sidebarOpened = !sidebarOpened"
      />

      <Schedule
        class="schedule-page__schedule"
        :loading="isLoading"
      />
    </UiContainer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Schedule from '@/components/Schedule/Schedule.vue'

import Sidebar from './components/Sidebar/Sidebar.vue'
import SidebarButton from './components/SidebarButton.vue'

@Component({
  components: {
    Schedule,
    Sidebar,
    SidebarButton
  }
})
export default class SchedulePage extends Vue {
  sidebarOpened = false

  get isLoading () {
    return this.$store.state.schedule.isLoading
  }

  async mounted () {
    const { date } = this.$route.query

    if (date) {
      this.$store.commit('schedule/SET_DATE', date)
    }

    await this.$store.dispatch('schedule/fetch')
  }
}
</script>

<style lang="scss" src="./SchedulePage.scss"></style>
