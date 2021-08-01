<template>
  <div class="error-page">
    <UiContainer>
      <UiPlaceholder
        v-if="status === 404"
        title="404"
        text="Страница не найдена"
        image="/static/img/404.svg"
      >
        <UiButton
          theme="info-outlined"
          @click.native="goHome"
        >
          Перейти на главную
        </UiButton>
      </UiPlaceholder>

      <UiPlaceholder
        v-else
        title="Сайт временно не доступен"
        image="/static/img/server-error.svg"
      >
        <template #text>
          Попробуйте повторить запрос позже <br>

          Email для связи:
          <UiLink
            tag="a"
            theme="action"
            href="mailto:admin@pullcrm.com"
          >
            admin@pullcrm.com
          </UiLink>
        </template>

        <UiButton
          theme="blue"
          @click.native="onReload"
        >
          Обновить страницу
        </UiButton>
      </UiPlaceholder>
    </UiContainer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    error: {
      type: Object,
      default: null
    }
  }
})
export default class Error extends Vue {
  readonly error

  get status () {
    if (!this.error) {
      return 404
    }

    return this.error.statusCode
  }

  goHome () {
    const { href } = this.$router.resolve({
      name: 'landing'
    })

    window.location.href = href
  }

  onReload () {
    window.location.reload()
  }
}
</script>

<style lang="scss">
  .error-page {
    display: flex;
    align-items: center;
    min-height: calc(100vh - 200px);
    padding: 50px 0;

    .ui-placeholder__title {
      max-width: 100%;
    }
  }
</style>
