<template>
  <div class="landing-home-page">
    <Header />

    <Container>
      <Intro
        class="landing-home-page__section"
      />

      <Features
        class="landing-home-page__section"
      />

      <Opportunities
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

import Footer from '../components/Footer/Footer.vue'
import Header from '../components/Header/Header.vue'
import Container from '../components/Container.vue'

import Intro from './components/Intro/Intro.vue'
import Features from './components/Features/Features.vue'
import Opportunities from './components/Opportunities/Opportunities.vue'

@Component({
  components: {
    Intro,
    Footer,
    Header,
    Features,
    Container,
    Opportunities
  }
})
export default class HomePage extends Vue {}
</script>

<style lang="scss" src="./HomePage.scss"></style>
