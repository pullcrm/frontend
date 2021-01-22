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
            :left-icon="hasSmsRemindNotify ? 'outlined/x' : 'outlined/pencil'"
            @click.native="hasSmsRemindNotify = !hasSmsRemindNotify"
          >
            Напомнить за время
          </UiDropdownItem>

          <UiDropdownItem
            v-if="isCreate"
            size="m"
            :left-icon="hasSmsCreationNotify ? 'outlined/x' : 'outlined/pencil'"
            @click.native="hasSmsCreationNotify = !hasSmsCreationNotify"
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
        v-if="hasSmsRemindNotify"
        size="m"
        clickable
        right-icon="outlined/x"
        @click.native="hasSmsRemindNotify = false"
      >
        Напомнить о записи
      </UiBadge>

      <UiBadge
        v-if="isCreate && hasSmsCreationNotify"
        size="m"
        clickable
        right-icon="outlined/x"
        @click.native="hasSmsCreationNotify = false"
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

    smsRemindNotify: {
      type: Boolean,
      default: false
    },

    smsCreationNotify: {
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
  readonly smsRemindNotify : boolean
  readonly smsCreationNotify : boolean

  get isSMSAuthorize () {
    return this.$store.getters['sms/isAuthorize']
  }

  get hasSmsRemindNotify () {
    return this.smsRemindNotify
  }

  set hasSmsRemindNotify (value) {
    this.$emit('update:smsRemindNotify', value)
  }

  get hasSmsCreationNotify () {
    return this.smsCreationNotify
  }

  set hasSmsCreationNotify (value) {
    this.$emit('update:smsCreationNotify', value)
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
