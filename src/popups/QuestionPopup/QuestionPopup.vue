<script lang="ts" setup>
interface IProps {
  question: {
    title: string
    input?: {
      tag?: 'textarea' | 'input'
      min?: number
      max?: number
      type?: string
      placeholder?: string
      value?: string
    }
    acceptButtonTitle?: string
    cancelButtonTitle?: string
  }
}

const props = defineProps<IProps>()
const emit = defineEmits(['submit', 'ok', 'cancel'])

const value = ref<number | string>(props.question.input?.value ?? 0)

const acceptButtonTitle = computed(() => {
  return props.question.acceptButtonTitle || 'ОК'
})

const cancelButtonTitle = computed(() => {
  return props.question.cancelButtonTitle || 'Скасувати'
})

function onSubmit() {
  if (props.question.input) {
    emit('submit', value.value)
    return
  }

  emit('ok')
}
</script>

<template>
  <UiPopup
    class="question-popup"
    @close="$emit('cancel')"
  >
    <form @submit.prevent="onSubmit">
      <UiTitle
        class="question-popup__title"
        size="m"
      >
        {{ question.title }}
      </UiTitle>

      <UiInput
        v-if="question.input"
        v-model="value"
        :tag="question.input.tag"
        class="question-popup__input"
        v-bind="question.input"
      />

      <div class="question-popup__actions">
        <UiButton
          theme="blue"
          type="submit"
        >
          <p v-text="acceptButtonTitle" />
        </UiButton>

        <UiButton
          theme="info-outlined"
          @click="$emit('cancel')"
        >
          <p v-text="cancelButtonTitle" />
        </UiButton>
      </div>
    </form>
  </UiPopup>
</template>

<style lang="scss" src="./QuestionPopup.scss" />
