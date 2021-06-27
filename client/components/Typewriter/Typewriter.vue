<template>
  <div class="typewriter">
    <p
      v-if="prepend"
      v-html="prepend"
    />

    {{ value }}

    <span v-if="canTyped" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { delay } from '~/utils/delay'

@Component({
  props: {
    list: {
      type: Array,
      required: true
    },

    prepend: {
      type: String,
      default: ''
    }
  }
})
export default class Typewriter extends Vue {
  readonly list!: string[]

  value: string

  constructor () {
    super()

    this.value = this.list[0]
  }

  get canTyped () {
    return this.list.length > 1
  }

  mounted () {
    if (this.canTyped) {
      this.printNext(1)
    }
  }

  async printNext (index) {
    await delay(3000)

    while (this.value.length > 0) {
      this.value = this.value.slice(0, -1)

      await delay(80)
    }

    await delay(500)

    if (index < this.list.length) {
      this.printByIndex(index)
    } else {
      this.printByIndex(0)
    }
  }

  async printByIndex (index) {
    const item = this.list[index]

    for (const letter of item) {
      await this.printLetter(letter)
    }

    this.printNext(index + 1)
  }

  async printLetter (letter) {
    this.value += letter

    await delay(150)
  }
}
</script>

<style lang="scss">
  @keyframes caret {
    50% {
      border-color: transparent;
    }
  }

  .typewriter {
    p {
      display: inline;
    }

    > span {
      border-right: 1px solid;
      animation: caret 1s steps(1) infinite;
    }
  }
</style>
