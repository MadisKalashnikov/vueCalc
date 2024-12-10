<script setup>
import Form from "@/components/FormSv.vue"
import Sidebar from "@/components/FoodsSidebar.vue";
import { ref } from "vue";

const foodData = ref([])
const asideState = ref("closed")

const updateFoodData = (data) => {
  foodData.value = data
}

const toggleAside = () => {
  asideState.value == "closed" ? asideState.value = "open" : asideState.value = "closed"
}
</script>

<template>
  <main @click.self="toggleAside">
    <Form @update-food-data="updateFoodData" :food-data="foodData" />
    <Sidebar @update-food-data="updateFoodData" :food-data="foodData" :class="asideState"/>
    <button class="hamburger" :class="asideState" @click="toggleAside">
      <i :class="asideState == 'closed' ? 'pi pi-bars' : 'pi pi-times'"></i>
    </button>
  </main>
</template>
