<template>
  <v-container>
    <h2 class="mb-5">
      {{ title }}
    </h2>
    <div class="d-flex justify-end">
      <v-btn
        color="primary"
        class="mb-5"
        @click="openCreateDialog"
      >
        {{ addButtonText }}
      </v-btn>
    </div>

    <v-data-table
      :items="items"
      :headers="headers"
      class="elevation-1"
      hide-default-footer
      no-data-text="Пусто"
    >
      <template
        v-if="type === 'doctor'"
        #item.isHead="{ item }"
      >
        <v-icon
          v-if="item.isHead"
          color="green"
        >
          mdi-check-circle
        </v-icon>
        <v-icon
          v-else
          color="grey"
        >
          mdi-circle-outline
        </v-icon>
      </template>

      <template #item.department="{ item }">
        {{ item.department === 1 ? "Отдельние кардиологии" : "Отдельние хирургии" }}
      </template>

      <template #item.actions="{ item }">
        <v-btn
          size="x-small"
          icon
          @click="editPerson(item)"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          icon
          size="x-small"
          @click="openDeleteDialog(item)"
        >
          <v-icon color="red">
            mdi-delete
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <UpsertModal
      :is-dialog-open="isUpsertDialogOpen"
      :person="selectedPerson"
      @close-dialog="closeEditDialog"
      @save="savePerson"
    />

    <DeleteModal
      :is-dialog-open="isDeleteDialogOpen"
      :person="selectedPerson"
      @close-dialog="closeDeleteDialog"
      @confirm-delete="confirmDelete"
    />
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import UpsertModal from '@/components/upsertModal.vue'
import DeleteModal from '@/components/deleteModal.vue'

const props = defineProps<{
  type: 'doctor' | 'nurse'
  items: Person[]
  title: string
  addButtonText: string
  headers: Array<{ title: string, value: string }>
}>()

const emit = defineEmits<{
  (e: 'fetchItems'): void
  (e: 'addPerson', person: Person): void
  (e: 'editPerson', person: Person): void
  (e: 'deletePerson', id: number): void
}>()

const isDeleteDialogOpen = ref(false)
const isUpsertDialogOpen = ref(false)
const selectedPerson = ref<Person | null>(null)

function openCreateDialog() {
  selectedPerson.value = { name: '', department: '', isHead: props.type === 'doctor' ? false : undefined }
  isUpsertDialogOpen.value = true
}

function editPerson(person: Person) {
  selectedPerson.value = { ...person }
  isUpsertDialogOpen.value = true
}

function openDeleteDialog(person: Person) {
  selectedPerson.value = person
  isDeleteDialogOpen.value = true
}

function closeDeleteDialog() {
  isDeleteDialogOpen.value = false
}

function closeEditDialog() {
  isUpsertDialogOpen.value = false
}

function confirmDelete() {
  if (selectedPerson.value?.id) {
    emit('deletePerson', selectedPerson.value.id)
    closeDeleteDialog()
  }
}

function savePerson() {
  if (selectedPerson.value) {
    if (selectedPerson.value.id) {
      emit('editPerson', selectedPerson.value)
    } else {
      emit('addPerson', selectedPerson.value)
    }
    closeEditDialog()
  }
}

onMounted(() => {
  emit('fetchItems')
})
</script>
