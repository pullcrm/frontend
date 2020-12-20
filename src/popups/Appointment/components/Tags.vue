<template>
  <div class="appointment-tags">
    <div class="appointment-tags__inner">
      <UiDropdownMenu>
        <template #inner="{ open, close, isOpened }">
          <UiBadge
            size="m"
            clickable
            right-icon="plus/plus"
            @click.native="isOpened ? close() : open()"
          >
            Еще
          </UiBadge>
        </template>

        <UiDropdownList>
          <UiText
            size="m"
            :left-icon="isQueue ? 'close/close-1' : 'edit/edit-1'"
            @click.native="isQueue = !isQueue"
          >
            Добавить в очередь
          </UiText>
        </UiDropdownList>

        <UiDropdownList
          v-if="hasSMSAuthorize"
          name="СМС сообщения"
        >
          <UiText
            size="m"
            :left-icon="hasSmsRemindNotify ? 'close/close-1' : 'edit/edit-1'"
            @click.native="hasSmsRemindNotify = !hasSmsRemindNotify"
          >
            Напомнить за время
          </UiText>

          <UiText
            v-if="isCreate"
            size="m"
            :left-icon="hasSmsCreationNotify ? 'close/close-1' : 'edit/edit-1'"
            @click.native="hasSmsCreationNotify = !hasSmsCreationNotify"
          >
            Сообщить о создании
          </UiText>
        </UiDropdownList>

        <UiDropdownList
          v-if="isCreate === false"
          name="Статус записи"
        >
          <UiText
            v-for="{ key, value } in statuses"
            :key="key"
            size="m"
            :left-icon="key === status ? 'close/close-1' : 'edit/edit-1'"
            @click.native="onStatus(key)"
          >
            {{ value }}
          </UiText>
        </UiDropdownList>
      </UiDropdownMenu>

      <UiBadge
        v-if="isQueue"
        size="m"
        clickable
        right-icon="close/close-1"
        @click.native="isQueue = false"
      >
        Добавлено в очередь
      </UiBadge>

      <UiBadge
        v-if="hasSmsRemindNotify"
        size="m"
        clickable
        right-icon="close/close-1"
        @click.native="hasSmsRemindNotify = false"
      >
        Напомнить о записи
      </UiBadge>

      <UiBadge
        v-if="isCreate && hasSmsCreationNotify"
        size="m"
        clickable
        right-icon="close/close-1"
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

  get hasSMSAuthorize () {
    return this.$store.getters['sms/hasSMSAuthorize']
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
