<template>
  <Layout>
    <UiContainer>
      <CalendarHeader />

      <UiPanel>
        <div class="calendar">
          <StaffPanel>
            <template
              #list
            >
              <Staff
                v-for="(staff, index) in employee"
                :key="index"
                :staff="staff"
              />
            </template>
          </StaffPanel>

          <CalendarGrid
            v-if="employee.length > 0"
          >
            <Appointment
              v-for="(item, index) in appointments"
              :key="`appointment-${index}`"
              :item="item"
            />

            <TimeOff
              v-for="(time, index) in timeOff"
              :key="`time-off-${index}`"
              :time-off="time"
            />

            <GridItemPlaceholder />

            <GridTile
              v-for="(tile, index) in tiles"
              :key="`tile-${index}`"
              :area="tile"
            />
          </CalendarGrid>
        </div>
      </UiPanel>
    </UiContainer>
  </Layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import Layout from '@/Layout/base.vue'
import UiPanel from '@/components/Panel.vue'
import UiContainer from '@/components/Container.vue'

import Staff from './components/Employee/Staff.vue'
import TimeOff from './components/TimeOff.vue'
import GridTile from './components/GridTile.vue'
import StaffPanel from './components/Employee/StaffPanel.vue'
import Appointment from './components/Appointment/GridItemLayout.vue'
import CalendarGrid from './components/CalendarGrid.vue'
import CalendarHeader from './components/Header/Header.vue'
import GridItemPlaceholder from './components/Appointment/GridItemPlaceholder.vue'

@Component({
  components: {
    Layout,
    Staff,
    TimeOff,
    GridTile,
    StaffPanel,
    Appointment,
    UiContainer,
    UiPanel,
    CalendarGrid,
    CalendarHeader,
    GridItemPlaceholder
  }
})
export default class App extends Vue {
  get employee () {
    return this.$store.getters.employee
  }

  get rows () {
    return this.employee.length
  }

  get appointments () {
    return this.$store.state.appointments
  }

  get timeOff () {
    return this.$store.state.timesOff
  }

  get tiles () {
    return this.$store.getters.tiles
  }
}
</script>

<style lang="scss" src="./Calendar.scss"></style>
