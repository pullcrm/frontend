<template>
  <div class="landing-faq-page">
    <Header />

    <Container>
      123
    </Container>

    <Footer
      class="landing-faq-page__footer"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Footer from '~/landing/components/Footer/Footer.vue'
import Header from '~/landing/components/Header/Header.vue'
import Container from '~/landing/components/Container.vue'

@Component({
  components: {
    Footer,
    Header,
    Container
  }
})
export default class FaqPage extends Vue {}
</script>

<style lang="scss" src="./FaqPage.scss"></style>
