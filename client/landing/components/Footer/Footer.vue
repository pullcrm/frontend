<template>
  <div class="landing-footer">
    <Container>
      <div class="landing-footer__inner">
        <UiText
          size="m"
          responsive
          class="landing-footer__about"
        >
          <strong>Pullcrm</strong> — удобный инстурмент <br> автоматизации записи для вашей компании
        </UiText>

        <div class="landing-footer__links">
          <UiText
            tag="RouterLink"
            to="/faq/"
            size="m"
            responsive
          >
            FAQ
          </UiText>

          <UiText
            tag="a"
            href="#"
            target="_blank"
            size="m"
            left-icon="solid/twitter-logo-fill"
            responsive
            class="_twitter"
          >
            Twitter
          </UiText>
        </div>
      </div>
    </Container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Container from '../Container.vue'

@Component({
  components: {
    Container
  }
})
export default class Footer extends Vue {}
</script>

<style lang="scss" src="./Footer.scss"></style>
