<template>
  <PersonTable
    title="Медсестры"
    add-button-text="Добавить медсестру"
    :type="'nurse'"
    :items="personalStore.nurses"
    :headers="nursesHeaders"
    @fetch-items="personalStore.fetchNurses"
    @add-person="personalStore.addNurse"
    @edit-person="personalStore.editNurse"
    @delete-person="personalStore.deleteNurse"
  />
</template>

<script setup lang="ts">
import { usePersonal } from '@/store/personal'
import PersonTable from '@/components/personsTableView.vue'

const personalStore = usePersonal()

const nursesHeaders = [
  { title: 'ФИО', value: 'name' },
  { title: 'Отделение', value: 'department' },
  { title: 'Действия', value: 'actions' }
]
</script>
