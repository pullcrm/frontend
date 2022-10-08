<script lang="ts" setup>
import Popup from './Popup.vue'

const Appointment = defineAsyncComponent(() => import(
  '~/popups/Appointment/Appointment.vue'
))

const SpecialistNew = defineAsyncComponent(() => import(
  '~/popups/Specialist/New.vue'
))

const SpecialistProcedures = defineAsyncComponent(() => import(
  '~/popups/SpecialistProcedures/SpecialistProcedures.vue'
))

const ProcedureNew = defineAsyncComponent(() => import(
  '~/popups/Procedure/New.vue'
))

const ProcedureEdit = defineAsyncComponent(() => import(
  '~/popups/Procedure/Edit.vue'
))

const NewProcedureCategory = defineAsyncComponent(() => import(
  '~/popups/ProcedureCategory/NewProcedureCategory.vue'
))

const EditProcedureCategory = defineAsyncComponent(() => import(
  '~/popups/ProcedureCategory/EditProcedureCategory.vue'
))

const TimeOffNew = defineAsyncComponent(() => import(
  '~/popups/TimeOff/New.vue'
))

const TimeOffEdit = defineAsyncComponent(() => import(
  '~/popups/TimeOff/Edit.vue'
))

const TimetableNew = defineAsyncComponent(() => import(
  '~/popups/Timetable/New.vue'
))

const TimetableEdit = defineAsyncComponent(() => import(
  '~/popups/Timetable/Edit.vue'
))

const SmsConfirmation = defineAsyncComponent(() => import(
  '~/popups/Confirmation/Sms.vue'
))

const QuestionPopup = defineAsyncComponent(() => import(
  '~/popups/QuestionPopup/QuestionPopup.vue'
))

const route = useRoute()

const popupStore = usePopupStore()

watch(
  () => route.fullPath,
  () => popupStore.hide(),
)

const question = computed(() => {
  return popupStore.question
})

const confirmation = computed(() => {
  return popupStore.smsConfirmationInfo
})

function answerQuestion(answer: boolean | string | number) {
  return popupStore.answerQuestion(answer)
}

function smsConfirmed(result: boolean) {
  return popupStore.smsConfirmed(result)
}
</script>

<template>
  <div class="popups">
    <!-- Specialist -->
    <Popup
      v-slot="{ close, props }"
      name="specialist-new"
    >
      <SpecialistNew
        v-bind="props"
        @close="close"
      />
    </Popup>
    <!-- Specialist end -->

    <!-- Procedure -->
    <Popup
      v-slot="{ close, props }"
      name="new-procedure"
    >
      <ProcedureNew
        v-bind="props"
        @close="close"
      />
    </Popup>

    <Popup
      v-slot="{ close, props }"
      name="edit-procedure"
    >
      <ProcedureEdit
        v-bind="props"
        @close="close"
      />
    </Popup>

    <Popup
      v-slot="{ close, props }"
      name="new-procedure-category"
    >
      <NewProcedureCategory
        v-bind="props"
        @close="close"
      />
    </Popup>

    <Popup
      v-slot="{ close, props }"
      name="edit-procedure-category"
    >
      <EditProcedureCategory
        v-bind="props"
        @close="close"
      />
    </Popup>

    <!-- Procedure end -->

    <!-- Appointment -->
    <Popup
      v-slot="{ close, props }"
      name="appointment"
    >
      <Appointment
        v-bind="props"
        @close="close"
      />
    </Popup>

    <!-- TimeOff -->
    <Popup
      v-slot="{ close, props }"
      name="time-off-new"
    >
      <TimeOffNew
        v-bind="props"
        @close="close"
      />
    </Popup>

    <Popup
      v-slot="{ close, props }"
      name="time-off-edit"
    >
      <TimeOffEdit
        v-bind="props"
        @close="close"
      />
    </Popup>
    <!-- TimeOff end -->

    <!-- Timetable -->
    <Popup
      v-slot="{ close, props }"
      name="timetable-new"
    >
      <TimetableNew
        v-bind="props"
        @close="close"
      />
    </Popup>

    <Popup
      v-slot="{ close, props }"
      name="timetable-edit"
    >
      <TimetableEdit
        v-bind="props"
        @close="close"
      />
    </Popup>
    <!-- Timetable end -->

    <Popup
      v-slot="{ close, props }"
      name="specialist-procedures"
    >
      <SpecialistProcedures
        v-bind="props"
        @close="close"
      />
    </Popup>

    <UiPopupBackdrop
      v-if="confirmation"
      @close="smsConfirmed(false)"
    >
      <SmsConfirmation
        :confirmation="confirmation"
        @ok="smsConfirmed(true)"
        @cancel="smsConfirmed(false)"
      />
    </UiPopupBackdrop>

    <UiPopupBackdrop
      v-if="question"
      @close="answerQuestion(false)"
    >
      <QuestionPopup
        :question="question"
        @ok="answerQuestion(true)"
        @cancel="answerQuestion(false)"
        @submit="answerQuestion"
      />
    </UiPopupBackdrop>
  </div>
</template>
