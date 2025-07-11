<template>
    <h1>Proyectos</h1>
    <div>
        <input type="text" v-model="filters.name" placeholder="Filtrar por nombre" class="border p-2 mb-4" />
        <select v-model="filters.status" class="bg-gray-100">
            <option value="">Todos</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
        </select>
        <button @click="openForm = true" class="px-4">+ Proyecto</button>
    </div>
    <Table :data="filteredProjects" :columns="['name','status']"></Table>
    <ProjectForm v-if="openForm" @close="openForm = false" @refresh="fetchProjects" />
</template>
<script setup>
//console.log('Component ProjectList.VUE montado');
import{ref,computed,onMounted} from 'vue'
import axios from 'axios'
import Table from '../components/Table.vue'
import ProjectForm from '../components/ProjectForm.vue'
const project=ref([])
const openForm=ref(false)
const filters = ref({
    name: '',
    status: ''
})
const fetchProjects = async () => {
    try {
        const response = await axios.get('https://681507e7225ff1af162aeb7e.mockapi.io/api/v1/projects');
        //console.log(response.data);
        project.value = response.data;
    } catch (error) {
        //console.error('Error al cargar proyectos:', error);
        alert('Error al cargar proyectos');
    }
};
onMounted(fetchProjects);
const filteredProjects = computed(() =>{
    return (project.value || []).filter(p => {
        if (!p || typeof p !== 'object') return false;
        const name = p.name || '';
        const status = p.status || '';
        const matchesName = name.toLowerCase().includes(filters.value.name.toLowerCase());
        const matchesStatus = !filters.value.status || status === filters.value.status;
        return matchesName && matchesStatus;
    });
});
</script>