<template>
  <div v-if="hasSmsError">
    <UiContainer>
      <UiAlert
        theme="error"
        left-icon="solid/warning-circle-fill"
        class="sms-alert"
      >
        Оповіщення щодо СМС відключені! Спробуйте оновити налаштування постачальника.
        <UiLink
          theme="action"
          @click.native="resetSms"
        >
          Скинути налаштування
        </UiLink>
      </UiAlert>
    </UiContainer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class SmsAlert extends Vue {
  get hasSmsError () {
    return this.$typedStore.state.sms.hasSmsError
  }

  async resetSms () {
    await this.$api.sms.settingRemove()

    const { href } = this.$router.resolve({
      name: 'smsSettings'
    })

    window.location.href = href
  }
}
</script>
