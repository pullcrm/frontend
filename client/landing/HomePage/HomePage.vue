<template>
  <div class="landing-home-page">
    <Header />

    <Container>
      <Intro
        class="landing-home-page__section"
      />

      <Opportunities
        class="landing-home-page__section"
      />

      <About
        class="landing-home-page__section"
      />

      <Reviews
        class="landing-home-page__section"
      />
    </Container>

    <Footer
      class="landing-home-page__footer"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Footer from '~/landing/components/Footer/Footer.vue'
import Header from '~/landing/components/Header/Header.vue'
import Container from '~/landing/components/Container.vue'

import Intro from './components/Intro/Intro.vue'
import About from './components/About/About.vue'
import Reviews from './components/Reviews/Reviews.vue'
import Opportunities from './components/Opportunities/Opportunities.vue'

@Component({
  components: {
    Intro,
    About,
    Footer,
    Header,
    Reviews,
    Container,
    Opportunities
  }
})
export default class HomePage extends Vue {}
</script>

<style lang="scss" src="./HomePage.scss"></style>
