<script setup>
import { computed } from 'vue';
import { useToast } from 'vue-toastification';
const toast = useToast()
const emit = defineEmits(['update-food-data'])

const props = defineProps({
  foodData: Array,
  asideState: String,
})

const calculateTotal = (grams, carbs, multiplier) => {
  return parseFloat((grams * carbs * multiplier) / 1000)
}

const total = computed(() => {
  return props.foodData.reduce((accumulator, food) => {
    return accumulator + calculateTotal(food.grams, food.carbs, food.multiplier);
  }, 0).toFixed(1);
});

const deleteFood = (id) => {
  const index = props.foodData.findIndex(food => food.food === id);

  if (index !== -1) {
    const updatedData = [...props.foodData];
    updatedData.splice(index, 1);
    emit('update-food-data', updatedData);
    toast.info(`${id} on eemaldatud`)
  }
};
</script>

<template>
  <aside :class="asideState" @click.stop>
    <p v-if="foodData.length > 0">
      Kokku: {{ total }} üh
    </p>
    <p v-else>Kokku: 0 üh</p>
    <div class="food-list">
      <div v-for="food in props.foodData" :key="food.food">
        <div>
          <p> {{ food.food }} </p>
          <p>{{ food.grams }}g {{ food.carbs }}sv {{ calculateTotal(food.grams, food.carbs, food.multiplier).toFixed(1) }} üh</p>
          <i @click="deleteFood(food.food)" class="pi pi-trash"></i>
        </div>
      </div>
    </div>


  </aside>
</template>
