<template>
  <div class="landing-home-page">
    <Header />

    <Container>
      <Intro
        :types="typesFiltered"
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
  },

  async asyncData ({ api }) {
    const [types] = await Promise.all([
      api.public.companyTypes()
      // typedStore.dispatch('notion/fetchReviews')
    ])

    return {
      types
    }
  }
})
export default class HomePage extends Vue {
  readonly types: any[]

  get typesDict () {
    return this.types.reduce((acc, type) => {
      return {
        ...acc,
        [type.id]: type
      }
    }, {})
  }

  get typesFiltered () {
    return [
      this.typesDict[1],
      this.typesDict[12],
      this.typesDict[2]
    ].filter(Boolean)
  }
}
</script>

<style lang="scss" src="./HomePage.scss"></style>
