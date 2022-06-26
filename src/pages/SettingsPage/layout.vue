<script lang="ts" setup>
</script>

<template>
  <div class="settings-page-layout">
    <UiContainer>
      <UiTitle
        size="xl"
        responsive
        class="settings-page-layout__title"
      >
        Налаштування
      </UiTitle>

      <div class="settings-page-layout__container">
        <UiPanel
          size="s"
          responsive
          class="settings-page-layout__sidebar"
        >
          <UiText
            tag="RouterLink"
            :to="{ name: 'companySettings' }"
            size="l"
            responsive
            class="settings-page-layout__link"
          >
            Про компанію
          </UiText>
          <UiText
            tag="RouterLink"
            :to="{ name: 'timetableSettings' }"
            size="l"
            responsive
            class="settings-page-layout__link"
          >
            Графік роботи
          </UiText>
          <UiText
            tag="RouterLink"
            :to="{ name: 'widgetSettings' }"
            size="l"
            responsive
            class="settings-page-layout__link"
          >
            Онлайн запис
          </UiText>
          <UiText
            tag="RouterLink"
            :to="{ name: 'smsSettings' }"
            size="l"
            responsive
            class="settings-page-layout__link"
          >
            Налаштування СМС
          </UiText>
          <UiText
            tag="RouterLink"
            :to="{ name: 'smsHistory' }"
            size="l"
            responsive
            class="settings-page-layout__link"
          >
            Історія СМС
          </UiText>
        </UiPanel>

        <div class="settings-page-layout__inner">
          <RouterView />
        </div>
      </div>
    </UiContainer>
  </div>
</template>

<style lang="scss" src="./Layout.scss"></style>
