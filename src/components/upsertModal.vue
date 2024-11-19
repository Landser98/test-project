<template>
  <v-dialog
    :model-value="isDialogOpen"
    persistent
    max-width="500px"
  >
    <v-card>
      <v-card-title>
        <span class="headline">{{ isNew ? 'Создать' : 'Редактировать' }} {{ isDoctor ? 'доктора' : 'медсестру' }}</span>
      </v-card-title>

      <v-card-text>
        <v-form
          ref="form"
          @submit.prevent
        >
          <v-text-field
            v-model="person.name"
            label="ФИО"
            outlined
            required
            :rules="[value => value?.length ? true : 'Заполните это поле']"
          />
          <v-select
            v-model="person.department"
            :items="departments"
            label="Отделение"
            outlined
            item-title="name"
            item-value="id"
            :rules="[value => value ? true : 'Заполните это поле']"
          />
          <v-switch
            v-if="isDoctor"
            v-model="person.isHead"
            label="Главный доктор"
          />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn
          @click="closeDialog"
        >
          Отмена
        </v-btn>
        <v-btn
          color="primary"
          @click="savePerson"
        >
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed, ref} from 'vue'
const form = ref(null)
const props = defineProps<{
  isDialogOpen: boolean
  person: Person
}>()

const emit = defineEmits<{
  (e: 'close-dialog'): void
  (e: 'save'): void
  (e: 'input'): void
}>()

const person = computed({
  get() {
    return props.person
  },
  set(value: Person) {
    emit('input', value)
  }
})

const isNew = computed(() => !person.value.id)
const isDoctor = computed(() => person.value.isHead != undefined)
const departments = [
  { id: 1, name: 'Отделение кардиологии' },
  { id: 2, name: 'Отделение хирургии' },
]

function closeDialog() {
  emit('close-dialog')
}

function savePerson() {
  if(form.value.validate()) {
    emit('save')
  }
}
</script>
