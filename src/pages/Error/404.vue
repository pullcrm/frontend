<template>
  <div class="error-404-page">
    <UiContainer>
      <UiPlaceholder
        title="404 ERROR"
        text="Страница не найдена"
        :image="require('@/assets/images/404.svg')"
      >
        <UiButton
          theme="info-outlined"
          :to="{ name: 'dashboard' }"
        >
          Перейти на главную
        </UiButton>
      </UiPlaceholder>
    </UiContainer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class Error_404 extends Vue {

}
</script>

<style lang="scss">
  .error-404-page {
    display: flex;
    align-items: center;
    min-height: calc(100vh - 200px);
    padding: 50px 0;
  }
</style>
