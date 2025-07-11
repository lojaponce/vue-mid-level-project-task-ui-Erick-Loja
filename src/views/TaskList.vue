<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">
      Tareas
      <span v-if="projectId"> del Proyecto {{ projectId }}</span>
    </h2>
<TaskForm v-if="mostrarFormulario" @close="mostrarFormulario = false" @refresh="fetchTasks" />
<button @click="mostrarFormulario = true" class="mb-4 bg-green-600 text-white px-4 py-2 rounded">+ Tarea</button>

    <!-- Filtros -->
    <div class="flex flex-wrap gap-2 mb-4">
      <select v-model="filters.status" class="border p-2">
        <option value="">Todos los estados</option>
        <option value="pendiente">Pendiente</option>
        <option value="en progreso">En Progreso</option>
        <option value="hecho">Hecho</option>
      </select>

      <select v-model="filters.priority" class="border p-2">
        <option value="">Todas las prioridades</option>
        <option value="alta">Alta</option>
        <option value="media">Media</option>
        <option value="baja">Baja</option>
      </select>
    </div>

    <!-- Tabla -->
    <table class="table-auto w-full border">
      <thead class="bg-gray-200">
        <tr>
          <th class="p-2">Nombre</th>
          <th class="p-2">Estado</th>
          <th class="p-2">Prioridad</th>
          <th class="p-2" v-if="!projectId">Proyecto</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in filteredTasks" :key="task.id" class="border-b">
          <td class="p-2">{{ task.name }}</td>
          <td class="p-2">{{ task.status }}</td>
          <td class="p-2">{{ task.priority }}</td>
          <td class="p-2" v-if="!projectId">{{ task.project_id }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import TaskForm from '../components/TaskForm.vue'
const mostrarFormulario = ref(false)


// Obtener el parámetro :projectId si existe
const route = useRoute()
const projectId = route.params.projectId || null

const tasks = ref([])
const filters = ref({
  status: '',
  priority: ''
})

// Llamada a la API
const fetchTasks = async () => {
  try {
    const res = await axios.get('https://681507e7225ff1af162aeb7e.mockapi.io/api/v1/tasks')
    tasks.value = res.data
  } catch (err) {
    console.error('❌ Error cargando tareas:', err)
  }
}
onMounted(fetchTasks)

// Filtros combinados
const filteredTasks = computed(() => {
  return tasks.value.filter(task => {
    const matchProject = projectId ? task.project_id === projectId : true
    const matchStatus = !filters.value.status || task.status === filters.value.status
    const matchPriority = !filters.value.priority || task.priority === filters.value.priority
    return matchProject && matchStatus && matchPriority
  })
})
</script>
