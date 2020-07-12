<template>
  <div
    class="company-create"
  >
    <div class="company-create__header">
      <UiTitle
        size="xl"
      >
        Создание компании
      </UiTitle>

      <UiText>
        Укажите информацию о компании
      </UiText>
    </div>

    <form
      @submit.prevent="submit"
    >
      <UiBack
        v-if="hasProfile"
        class="company-create__back"
        @click.native="onBack"
      />

      <UiField
        label="Название компании"
        required
      >
        <UiInput
          v-model="company.name"
          left-icon="edit/edit-1"
          placeholder="Ваша компания"
          required
        />
      </UiField>

      <UiField
        label="Город"
        required
      >
        <UiSelect
          v-model="company.city"
          label="name"
          placeholder="Выбрать город"
          :options="cities"
          required
        />
      </UiField>

      <UiField
        label="Какой у вас бизнес?"
        required
      >
        <UiSelect
          v-model="company.category"
          label="name"
          placeholder="Выбрать категорию"
          :options="categories"
          required
        />
      </UiField>

      <div class="company-create__actions">
        <UiButton
          type="submit"
          size="l"
          theme="blue"
        >
          Продолжить
        </UiButton>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
})
export default class Create extends Vue {
  company = {}

  cities = []
  categories = []

  get hasProfile () {
    return Boolean(this.$store.state.profile.profile)
  }

  async beforeMount () {
    const [categories, cities] = await Promise.all([
      this.$api.categories.all(),
      this.$api.cities.all()
    ])

    this.cities = cities
    this.categories = categories
  }

  async submit () {
    await this.$api.companies.create({
      // @ts-ignore
      name: this.company.name,
      // @ts-ignore
      cityId: this.company.city.id,
      // @ts-ignore
      categoryId: this.company.category.id
    })
    await this.$store.dispatch('approaches/fetch')
    await this.$store.dispatch('auth/fetchRefreshToken')

    this.onBack()
  }

  onBack () {
    this.$router.push({
      name: 'dashboard'
    })
  }
}
</script>

<style lang="scss">
  .company-create {
    width: 460px;

    &__back {
      margin-bottom: 24px;
    }

    &__header {
      text-align: center;

      .ui-title {
        margin-bottom: 8px;
        font-weight: 700;
      }
    }

    &__actions {
      display: flex;
      flex-direction: column;
      margin-top: 16px;
    }

    form {
      margin-top: 24px;
      padding: 24px;
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 0 16px rgba($ui-black-100, 0.1);
    }
  }
</style>
