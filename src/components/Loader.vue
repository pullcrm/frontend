<script lang="ts" setup>
</script>

<template>
  <div
    class="schedule-loader"
  >
    <UiIconLoader
      size="l"
    />
  </div>
</template>

<style lang="scss">
  .schedule-loader {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 12;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba($ui-black-100, 0.15);
  }
</style>
