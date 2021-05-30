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

      <div class="ui-grid">
        <div
          :class="[
            'ui-grid-item',
            'ui-grid-item_12',
            'ui-grid-item_tablet_4',
            'ui-grid-item_laptop_3',
            'ui-grid-item_desktop_2'
          ]"
        >
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
        </div>

        <div
          class="settings-page-layout__inner"
          :class="[
            'ui-grid-item',
            'ui-grid-item_12',
            'ui-grid-item_tablet_8',
            'ui-grid-item_laptop_8',
            'ui-grid-item_desktop_6'
          ]"
        >
          <UiPanel
            responsive
          >
            <slot />
          </UiPanel>
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
