<template>
  <div class="landing-footer">
    <Container>
      <div class="landing-footer__inner">
        <UiText
          size="m"
          class="landing-footer__about"
        >
          <strong>Pullcrm</strong> — удобный инструмент <br> автоматизации записи для вашей компании
        </UiText>

        <div class="landing-footer__links">
          <UiText
            tag="RouterLink"
            to="/faq/"
            size="m"
          >
            FAQ
          </UiText>

          <UiText
            tag="a"
            href="https://t.me/pullcrm"
            target="_blank"
            size="m"
          >
            <template #prepend>
              <img
                src="~assets/images/t_logo.svg"
                width="18px"
                height="18px"
                alt="telegram"
              >
            </template>

            Telegram
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
