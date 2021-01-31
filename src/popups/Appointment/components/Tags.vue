<template>
  <div class="appointment-tags">
    <div class="appointment-tags__inner">
      <UiDropdownMenu
        placement="bottom_start"
      >
        <template #inner="{ toggle }">
          <UiBadge
            size="m"
            clickable
            right-icon="outlined/plus"
            @click.native="toggle"
          >
            Еще
          </UiBadge>
        </template>

        <UiDropdownList>
          <UiDropdownItem
            size="m"
            :left-icon="isQueue ? 'outlined/x' : 'outlined/pencil'"
            @click.native="isQueue = !isQueue"
          >
            Добавить в очередь
          </UiDropdownItem>
        </UiDropdownList>

        <UiDropdownList
          v-if="isSMSAuthorize"
          name="СМС сообщения"
        >
          <UiDropdownItem
            size="m"
            :left-icon="hasRemindSMSNotify ? 'outlined/x' : 'outlined/pencil'"
            @click.native="hasRemindSMSNotify = !hasRemindSMSNotify"
          >
            Напомнить за время
          </UiDropdownItem>

          <UiDropdownItem
            v-if="isCreate"
            size="m"
            :left-icon="hasCreationSMSNotify ? 'outlined/x' : 'outlined/pencil'"
            @click.native="hasCreationSMSNotify = !hasCreationSMSNotify"
          >
            Сообщить о создании
          </UiDropdownItem>
        </UiDropdownList>

        <UiDropdownList
          v-if="isCreate === false"
          name="Статус записи"
        >
          <UiDropdownItem
            v-for="{ key, value } in statuses"
            :key="key"
            size="m"
            :left-icon="key === status ? 'outlined/x' : 'outlined/pencil'"
            @click.native="onStatus(key)"
          >
            {{ value }}
          </UiDropdownItem>
        </UiDropdownList>
      </UiDropdownMenu>

      <UiBadge
        v-if="isQueue"
        size="m"
        clickable
        right-icon="outlined/x"
        @click.native="isQueue = false"
      >
        Добавлено в очередь
      </UiBadge>

      <UiBadge
        v-if="hasRemindSMSNotify"
        size="m"
        clickable
        right-icon="outlined/x"
        @click.native="hasRemindSMSNotify = false"
      >
        Напомнить о записи
      </UiBadge>

      <UiBadge
        v-if="isCreate && hasCreationSMSNotify"
        size="m"
        clickable
        right-icon="outlined/x"
        @click.native="hasCreationSMSNotify = false"
      >
        Отправить sms после создания
      </UiBadge>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { statusesDict } from '@/logics/appointment'

@Component({
  props: {
    queue: {
      type: Boolean,
      default: false
    },

    hasRemindSms: {
      type: Boolean,
      default: false
    },

    hasCreationSms: {
      type: Boolean,
      default: false
    },

    isCreate: {
      type: Boolean,
      default: false
    },

    status: {
      type: String,
      default: null
    }
  }
})
export default class Tags extends Vue {
  readonly queue: boolean
  readonly status?: string
  readonly hasRemindSms : boolean
  readonly hasCreationSms : boolean

  get isSMSAuthorize () {
    return this.$store.getters['sms/isAuthorize']
  }

  get hasRemindSMSNotify () {
    return this.hasRemindSms
  }

  set hasRemindSMSNotify (value) {
    this.$emit('update:hasRemindSms', value)
  }

  get hasCreationSMSNotify () {
    return this.hasCreationSms
  }

  set hasCreationSMSNotify (value) {
    this.$emit('update:hasCreationSms', value)
  }

  get isQueue () {
    return this.queue
  }

  set isQueue (val) {
    this.$emit('update:queue', val)
  }

  get statuses () {
    return Object.keys(statusesDict)
      .map(key => {
        return {
          key,
          value: statusesDict[key]
        }
      })
  }

  onStatus (key) {
    this.$emit('update:status', key)
  }
}
</script>

<style lang="scss">
  .appointment-tags {
    &__inner {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -4px -8px;

      & > .ui-badge,
      .appointment-tags-dropdown-menu {
        margin: 0 4px 8px;
      }
    }
  }
</style>
