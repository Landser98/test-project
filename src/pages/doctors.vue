<template>
  <PersonTable
    title="Доктора"
    add-button-text="Добавить доктора"
    :type="'doctor'"
    :items="personalStore.doctors"
    :headers="doctorsHeaders"
    @fetch-items="personalStore.fetchDoctors"
    @add-person="personalStore.addDoctor"
    @edit-person="personalStore.editDoctor"
    @delete-person="personalStore.deleteDoctor"
  />
</template>

<script setup lang="ts">
import { usePersonal } from '@/store/personal'
import PersonTable from '@/components/personsTableView.vue'

const personalStore = usePersonal()

const doctorsHeaders = [
  { title: 'ФИО', value: 'name' },
  { title: 'Отделение', value: 'department' },
  { title: 'Главный доктор', value: 'isHead' },
  { title: 'Действия', value: 'actions' }
]

</script>
