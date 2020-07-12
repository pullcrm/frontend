<template>
  <UiUser
    class="calendar-employee-user"
    :user="staff"
    sub-name="Барбер"
    extended
  />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import UiUser from '@/components/Users/User.vue'

@Component({
  props: {
    staff: {
      type: Object,
      required: true
    },

    money: {
      type: Number,
      default: 1065
    }
  },

  components: {
    UiUser
  }
})
export default class Staff extends Vue {
  staff

  get avatar () {
    return this.staff.avatar?.data?.full_url
  }

  get previewAvatar () {
    return this.avatar ?? 'https://img2.freepng.ru/20180626/fhs/kisspng-avatar-user-computer-icons-software-developer-5b327cc98b5780.5684824215300354015708.jpg'
  }
}
</script>

<style lang="scss">
.calendar-employee-user {
  width: 100%;
  height: $CALENDAR_POINT_SIZE_HEIGHT;
}
</style>
