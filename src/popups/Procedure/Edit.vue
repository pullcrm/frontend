<template>
  <UiPopup
    class="procedures-edit"
    @close="$emit('close')"
  >
    <UiBack
      @back="$emit('close')"
    />

    <UiTitle
      class="procedures-edit__title"
      size="s"
    >
      Редактировать услугу
    </UiTitle>

    <form @submit.prevent="submit">
      <UiFormValidator
        v-slot="{ resetFieldError }"
        ref="formValidator"
        :validations="validations"
      >
        <UiField
          label="Название услуги"
        >
          <UiInput
            v-model="form.name"
            left-icon="outlined/pencil"
            placeholder="Введите название"
            @input="resetFieldError('name')"
          />
        </UiField>

        <UiField
          label="Цена"
        >
          <UiInput
            v-model="form.price"
            type="number"
            left-icon="outlined/pencil"
            placeholder="Укажите цену"
            @input="resetFieldError('price')"
          />
        </UiField>

        <UiField
          label="Длительность"
        >
          <UiSelect
            v-model="form.duration"
            label="name"
            :options="durationList"
            left-icon="outlined/pencil"
            placeholder="Выбрать время"
            @input="resetFieldError('duration')"
          />
        </UiField>

        <UiField
          label="Описание"
        >
          <UiInput
            v-model="form.description"
            tag="textarea"
            name="description"
            placeholder="Добавьте описание"
          />
        </UiField>

        <div class="procedures-edit__actions">
          <UiButton
            type="submit"
            size="l"
            theme="yellow"
          >
            Редактировать услугу
          </UiButton>

          <div
            class="procedures-edit__remove"
            @click="remove"
          >
            <p>Удалить услугу</p>
          </div>
        </div>
      </UiFormValidator>
    </form>
  </UiPopup>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { DURATIONS } from '@/constants/generated'

import { IProcedure } from '@/services/api'

@Component({
  props: {
    procedure: {
      type: Object,
      required: true
    }
  }
})
export default class ProcedureEdit extends Vue {
  readonly procedure: IProcedure

  form = {
    ...this.procedure,
    duration: this.durationList.find(({ value }) => value === this.procedure.duration)
  }

  get durationList () {
    return DURATIONS
  }

  get validations () {
    return {}
  }

  async submit () {
    await this.$api.procedures.update(this.form.id, {
      name: this.form.name,
      price: Number(this.form.price),
      duration: this.form.duration.value,
      description: this.form.description
    })

    await this.$store.dispatch('procedures/fetch')

    this.$emit('close')
  }

  async remove () {
    await this.$api.procedures.remove(this.form.id)
    await this.$store.dispatch('procedures/fetch')

    this.$emit('close')
  }
}
</script>

<style lang="scss">
  .procedures-edit {
    &__title {
      margin-top: 8px;
      margin-bottom: 24px;
    }

    &__actions {
      margin-top: 24px;

      .ui-button {
        width: 100%;
      }
    }

    &__remove {
      @include ui-typo-14;

      display: flex;
      justify-content: center;
      margin-top: 16px;
      color: $ui-black-80;

      p {
        cursor: pointer;
      }
    }

    .ui-field + .ui-field {
      margin-top: 24px;
    }
  }
</style>
