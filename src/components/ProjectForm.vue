<template>
    <div>
        <h2 class="mb-2"> Nuevo Proyecto</h2>
        <form @submit.prevent="submitForm">
            <div>
                <label class="mb-2">Nombre</label>
                <input type="text" v-model="form.name" class="border p-2 mb-4 w-full"  rounded required />
                <span>Campo requerido</span>
            </div>
            <div>
                <label class="blocl">Estado</label>
                <select v-model="form.status">
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                </select>
            </div>
            <div class="gap-2">
                <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Guardar</button>
                    <button type="button" @click="$emit('close')" class="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
            </div>
        </form>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import usaVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import axios from 'axios';

const emit = defineEmits(['close', 'refresh']);
const form = ref({
    name: '',
    status: 'activo'
});
const rules = {
    name: { required }
};
const v$ = usaVuelidate(rules, form);
const submitForm = async () => {
    v$.value.$touch();
    if (v$.value.$invalid) {
        return;
    }
    try {
        await axios.post('https://681507e7225ff1af162aeb7e.mockapi.io/api/v1/projects', form.value);
        emit('refresh');
        emit('close');
    } catch (error) {
        console.error('Error al guardar el proyecto:', error);
    }
};
</script>