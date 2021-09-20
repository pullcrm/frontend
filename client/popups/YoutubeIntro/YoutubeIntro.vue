<template>
  <UiPopup
    class="popup-youtube-intro"
    @close="$emit('close')"
  >
    <Youtube
      id="_jSNjI9TQD0"
    />
  </UiPopup>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Youtube from '~/components/Youtube/Youtube.vue'

@Component({
  components: {
    Youtube
  }
})
export default class YoutubeIntro extends Vue {}
</script>

<style lang="scss">
.popup-youtube-intro {
  @media (min-width: $ui-tablet) {
    width: 84%;
    max-width: 1400px;
  }
}
</style>
