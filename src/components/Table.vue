<template>
    <table>
        <thead>
            <tr>
                <th v-for="column in columns" :key="column">{{ column }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in data" :key="index">
                <td v-for="column in columns" :key="column">{{ item[column] }}</td>
            </tr>
        </tbody>
    </table>
</template>
<script setup>
defineProps({
    data:Array,
    columns:Array
});
</script>