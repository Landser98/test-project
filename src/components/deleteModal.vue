<template>
  <v-dialog
    :model-value="props.isDialogOpen"
    max-width="500px"
  >
    <v-card>
      <v-card-title class="headline">
        Удалить медсестру
      </v-card-title>
      <v-card-text>
        Вы уверены, что хотите удалить медсестру {{ person.name }} из отдела {{ person.department }}?
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="green"
          @click="cancelDelete"
        >
          Отмена
        </v-btn>
        <v-btn
          color="red"
          @click="confirmDelete"
        >
          Удалить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  isDialogOpen: boolean
  person: Person;
}>()

const emit = defineEmits<{
  (e: 'close-dialog'): void
  (e: 'confirm-delete'): void
}>()

function cancelDelete() {
  emit('close-dialog')
}

function confirmDelete() {
  emit('confirm-delete')
}
</script>
