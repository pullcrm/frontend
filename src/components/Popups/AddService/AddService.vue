<template>
  <popup name="add-procedure" scrollable height="auto" :width="380">
    <template #default>
      <UiForm
        title="Добавить услугу"
        can-back
        @on-back="onBack"
        @on-submit="onSubmit"
      >
        <UiFormControl
          label="Название услуги"
          name="name"
          placeholder="Введите название"
          v-model="form.name"
          required
        />

        <UiFormControl
          label="Цена"
          name="price"
          type="number"
          placeholder="Укажите цену"
          v-model="form.price"
          required
        />

        <UiFormControl
          type="select"
          label="Длительность"
          placeholder="Укажите длительность"
          select-label="name"
          :options="durationList"
          v-model="form.duration"
          required
        />

        <template
          #actions
        >
          <UiButton
            tag="button"
            type="submit"
          >
            Добавить услугу
          </UiButton>
        </template>
      </UiForm>
    </template>
  </popup>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { durations } from '@/logics/procedure'

// https://github.com/mengxiong10/vue2-datepicker
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

import UiForm from '@/pages/Auth/components/Form.vue'
import UiButton from '@/pages/Auth/components/Button.vue'
import UiFormControl from '@/pages/Auth/components/FormControl.vue'

@Component({
  components: {
    DatePicker,
    UiForm,
    UiButton,
    UiFormControl
  }
})
export default class AddService extends Vue {
  form = {
    name: '',
    price: 0,
    duration: null
  }

  get durationList () {
    return durations()
  }

  onBack () {
    this.$modal.hide('add-procedure')
  }

  async onSubmit () {
    await this.$api.procedures.create({
      name: this.form.name,
      price: Number(this.form.price),
      duration: this.form.duration.value
    })

    await this.$store.dispatch('procedures/fetch')

    this.$modal.hide('add-procedure')
  }
}
</script>

<style lang="scss" src="./AddService.scss"></style>
