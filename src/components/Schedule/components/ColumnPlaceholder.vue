<script lang="ts" setup>
</script>

<template>
  <div class="schedule-column-placeholder" />
</template>

<style lang="scss">
  .schedule-column-placeholder {
    @include background-image-disabled-placeholder(45deg);

    flex: 1;
    box-shadow: inset 1px 0 0 $ui-black-40;
  }
</style>
