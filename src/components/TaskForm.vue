<template>
  <div class="border p-4 rounded shadow mb-6">
    <h3 class="text-xl font-semibold mb-4">Nueva Tarea</h3>

    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label class="block mb-1">Nombre</label>
        <input v-model="form.name" type="text" class="border p-2 w-full" />
        <span v-if="v$.name.$error" class="text-red-500 text-sm">Campo requerido</span>
      </div>

      <div class="mb-4">
        <label class="block mb-1">Estado</label>
        <select v-model="form.status" class="border p-2 w-full">
          <option value="pendiente">Pendiente</option>
          <option value="en progreso">En Progreso</option>
          <option value="hecho">Hecho</option>
        </select>
      </div>

      <div class="mb-4">
        <label class="block mb-1">Prioridad</label>
        <select v-model="form.priority" class="border p-2 w-full">
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
      </div>

      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Crear</button>
      <button type="button" @click="$emit('close')" class="ml-2 px-4 py-2 bg-gray-300 rounded">Cancelar</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

const emit = defineEmits(['refresh', 'close'])
const route = useRoute()

// Formulario reactivo
const form = ref({
  name: '',
  status: 'pendiente',
  priority: 'media',
  project_id: route.params.projectId || ''
})

// Validaciones
const rules = {
  name: { required }
}
const v$ = useVuelidate(rules, form)

const submitForm = async () => {
  v$.value.$touch()
  if (v$.value.$invalid) return

  try {
    await axios.post('https://681507e7225ff1af162aeb7e.mockapi.io/api/v1/tasks', form.value)
    emit('refresh')
    emit('close')
  } catch (error) {
    console.error('Error creando tarea:', error)
  }
}
</script>
