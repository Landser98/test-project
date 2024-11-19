import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePersonal = defineStore('personal', () => {
  const nurses = ref<Nurse[]>([])
  const doctors = ref<Doctor[]>([])

  function generateId(list: Person): number {
    const lastId = list.length > 0 ? Math.max(...list.map(item => item.id)) : 0
    return lastId + 1
  }

  async function fetchNurses(): Promise<void> {
    try {
      const response = await fetch('/nurses.json')
      nurses.value = await response.json()
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error)
    }
  }

  async function fetchDoctors(): Promise<void> {
    try {
      const response = await fetch('/doctors.json')
      doctors.value = await response.json()
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error)
    }
  }

  function addNurse(nurse: Nurse) {
    nurse.id = generateId(nurses.value)
    nurses.value.push(nurse)
  }

  function addDoctor(doctor: Doctor) {
    doctor.id = generateId(doctors.value)
    doctors.value.push(doctor)
  }

  function deleteNurse(id: number) {
    nurses.value = nurses.value.filter(nurse => nurse.id !== id)
  }

  function deleteDoctor(id: number) {
    doctors.value = doctors.value.filter(doctor => doctor.id !== id)
  }

  function editNurse(updatedNurse: Nurse) {
    const index = nurses.value.findIndex(nurse => nurse.id === updatedNurse.id)
    if (index !== -1) {
      nurses.value[index] = updatedNurse
    }
  }

  function editDoctor(updatedDoctor: Doctor) {
    const index = doctors.value.findIndex(doctor => doctor.id === updatedDoctor.id)
    if (index !== -1) {
      doctors.value[index] = updatedDoctor
    }
  }

  return { nurses, doctors, fetchNurses, fetchDoctors, deleteNurse, deleteDoctor, addNurse, addDoctor, editNurse, editDoctor }
})
