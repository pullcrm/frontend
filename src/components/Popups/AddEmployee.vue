<template>
  <div>
    <popup name="add-employee" scrollable height="auto" :width="380">
      <template #default>
        <UiForm
          class="add-employee-popup"
          title="Добавить сотрудника"
          can-back
          @on-back="onBack"
          @on-submit="onSubmit"
        >
          <label
            for="user-avatar-image"
            class="add-employee-popup__avatar"
          >
            <ImagePreviewCircle
              :image="image"
              name="+"
              size="custom"
            />

            <input type="file" name="user-avatar-image" id="user-avatar-image" accept="image/jpeg,image/png,image/jpg" @change="onAvatar">
          </label>

          <UiFormControl
            label="Имя"
            name="name"
            placeholder="Введите Имя"
            v-model="form.firstName"
            required
          />

          <UiFormControl
            label="Фамилия"
            name="surname"
            placeholder="Введите Фамилию"
            v-model="form.lastName"
            required
          />

          <UiFormControl
            label="Телефон"
            name="phone"
            type="phone"
            placeholder="+38 (0"
            v-model="form.phone"
            required
          />

          <template
            #actions
          >
            <UiButton
              tag="button"
              type="submit"
            >
              Добавить сотрудника
            </UiButton>
          </template>
        </UiForm>
      </template>
    </popup>

    <popup name="add-employee-code" scrollable height="auto" :width="380">
      <UiForm
        title="Регистрация"
        :sub-title="`На ваш телефон ${form.phone} был выслан СМС-код для подтверждения регистрации`"
        can-back
        @on-back="onBackSms"
        @on-submit="onSubmitSms"
      >
        <UiFormControl
          label="Код подтверждения"
          placeholder="****"
          v-model="form.code"
          required
        />

        <template
          #actions
        >
          <UiButton
            tag="button"
            type="submit"
          >
            Подтвердить
          </UiButton>
        </template>
      </UiForm>
    </popup>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { IRegistrationUserParams } from '@/services/api/'
import { readFileAsync } from '@/logics/file'

import ImagePreviewCircle from '@/components/ImagePreviewCircle/ImagePreviewCircle.vue'

import UiForm from '@/pages/Auth/components/Form.vue'
import UiButton from '@/pages/Auth/components/Button.vue'
import UiFormControl from '@/pages/Auth/components/FormControl.vue'

@Component({
  components: {
    UiForm,
    UiButton,
    UiFormControl,
    ImagePreviewCircle
  }
})
export default class AddEmployee extends Vue {
  form: IRegistrationUserParams = {
    firstName: '',
    lastName: '',
    phone: '',
    code: null
  }

  currentImageUrl = ''
  currentFile: File

  get image () {
    return this.currentImageUrl ?? ''
  }

  onBack () {
    this.$modal.hide('add-employee')
  }

  onBackSms () {
    this.$modal.hide('add-employee-code')
    this.$modal.show('add-employee')
  }

  async onAvatar ({ target }) {
    if (!target.files) return

    const photo = await readFileAsync(target.files[0])

    // @ts-ignore
    this.currentImageUrl = photo.url
    this.currentFile = target.files[0]

    const data = new FormData()
    data.append('file', target.files[0])

    await this.$api.files.create(data)
  }

  async onSubmit () {
    try {
      await this.$api.users.confirmation({
        phone: this.form.phone
      })

      this.$modal.hide('add-employee')
      this.$modal.show('add-employee-code')
    } catch (error) {
      if (error) {
        // TODO: refactor
        // this.$buefy.toast.open({
        //   message: 'упс'
        // })
      }
    }
  }

  async onSubmitSms () {
    try {
      await this.$api.employee.create(this.form)
      await this.$store.dispatch('employee/fetch')

      this.$modal.hide('add-employee-code')
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style lang="scss">
  .add-employee-popup {
    &__avatar {
      position: relative;
      margin: 16px 0;

      input {
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        visibility: hidden;
      }

      .ui-image-preview-circle {
        @include ui-typo-44;

        width: 80px;
        height: 80px;
        margin: 0 auto;
        cursor: pointer;

        p {
          font-weight: 100;
        }
      }
    }
  }
</style>
