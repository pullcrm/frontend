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

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import UiPopupBackdrop from '~/ui/PopupBackdrop/PopupBackdrop.vue'

import Popup from './Popup.vue'

const Appointment = () => import(
  /* webpackChunkName: "popups" */
  '~/popups/Appointment/Appointment.vue'
)

const SpecialistNew = () => import(
  /* webpackChunkName: "popups" */
  '~/popups/Specialist/New.vue'
)

const SpecialistProcedures = () => import(
  /* webpackChunkName: "popups" */
  '~/popups/SpecialistProcedures/SpecialistProcedures.vue'
)

const ProcedureNew = () => import(
  /* webpackChunkName: "popups" */
  '~/popups/Procedure/New.vue'
)

const ProcedureEdit = () => import(
  /* webpackChunkName: "popups" */
  '~/popups/Procedure/Edit.vue'
)

const NewProcedureCategory = () => import(
  /* webpackChunkName: "popups" */
  '~/popups/ProcedureCategory/NewProcedureCategory.vue'
)

const EditProcedureCategory = () => import(
  /* webpackChunkName: "popups" */
  '~/popups/ProcedureCategory/EditProcedureCategory.vue'
)

const TimeOffNew = () => import(
  /* webpackChunkName: "popups" */
  '~/popups/TimeOff/New.vue'
)

const TimeOffEdit = () => import(
  /* webpackChunkName: "popups" */
  '~/popups/TimeOff/Edit.vue'
)

const SmsConfirmation = () => import(
  /* webpackChunkName: "popups" */
  '~/popups/Confirmation/Sms.vue'
)

const QuestionPopup = () => import(
  /* webpackChunkName: "popups" */
  '~/popups/QuestionPopup/QuestionPopup.vue'
)

@Component({
  components: {
    Popup,
    TimeOffNew,
    Appointment,
    TimeOffEdit,
    SpecialistNew,
    ProcedureNew,
    ProcedureEdit,
    QuestionPopup,
    SmsConfirmation,
    UiPopupBackdrop,
    SpecialistProcedures,
    NewProcedureCategory,
    EditProcedureCategory
  },

  watch: {
    $route () {
      this.$typedStore.dispatch('popup/hide')
    }
  }
})
export default class Popups extends Vue {
  get question () {
    return this.$typedStore.state.popup.question
  }

  get confirmation () {
    return this.$typedStore.state.popup.smsConfirmation
  }

  answerQuestion (answer: boolean | string | number) {
    return this.$typedStore.dispatch('popup/answerQuestion', answer)
  }

  smsConfirmed (result: boolean) {
    return this.$typedStore.dispatch('popup/smsConfirmed', result)
  }
}
</script>
