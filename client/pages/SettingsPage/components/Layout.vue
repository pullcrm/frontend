<template>
  <div class="settings-page-layout">
    <UiContainer>
      <UiTitle
        size="xl"
        responsive
        class="settings-page-layout__title"
      >
        Настройки
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
            О компании
          </UiText>
          <UiText
            tag="RouterLink"
            :to="{ name: 'timetableSettings' }"
            size="l"
            responsive
            class="settings-page-layout__link"
          >
            График работы
          </UiText>
          <UiText
            tag="RouterLink"
            :to="{ name: 'smsSettings' }"
            size="l"
            responsive
            class="settings-page-layout__link"
          >
            Настройки СМС
          </UiText>
          <UiText
            tag="RouterLink"
            :to="{ name: 'widgetSettings' }"
            size="l"
            responsive
            class="settings-page-layout__link"
          >
            Онлайн запись
          </UiText>
        </UiPanel>

        <div class="settings-page-layout__inner">
          <slot />
        </div>
      </div>
    </UiContainer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class SettingsLayout extends Vue {}
</script>

<style lang="scss" src="./Layout.scss"></style>
