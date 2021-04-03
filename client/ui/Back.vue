<template>
  <UiText
    class="ui-back"
    size="s"
    @click.native="$emit('back')"
  >
    <template #prepend>
      <UiIcon
        name="outlined/arrow-left"
        size="xs"
      />
    </template>

    Назад
  </UiText>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class Back extends Vue {}
</script>

<style lang="scss">
  .ui-back {
    color: $ui-black-80;
    cursor: pointer;
  }
</style>
