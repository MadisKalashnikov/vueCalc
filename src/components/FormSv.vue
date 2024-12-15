<script setup>
import { computed, reactive } from "vue";
import { useToast } from "vue-toastification";

const emit = defineEmits(['update-food-data']);

const props = defineProps({
  foodData: Array,
})

const foodForm = reactive({
  carbs: Number,
  grams: Number,
  multiplier: 1,
  food: "",
  clearForm: () => {
    foodForm.carbs = 0
    foodForm.grams = 0
    foodForm. multiplier = 1
    foodForm.food = ""
  },
})
const currentTotal = computed(() => {
  return (foodForm.grams * foodForm.carbs * foodForm.multiplier / 1000).toFixed(2)
})
const toast = useToast()

const handleSubmit = () => {
  if (foodForm.grams == 0) {
    toast.error("Grammid ei saa võrduda nulliga", {
      maxtoasts: 3,
    })
  } else if (foodForm.carbs == 0 ) {
    toast.error("Süsivesikud ei saa võrduda nulliga", {
      maxtoasts: 3,
    })
  } else {
    const newFood = {
      carbs: foodForm.carbs,
      grams: foodForm.grams,
      multiplier: foodForm.multiplier,
      food: foodForm.food,
    }
    const newArray = [...props.foodData]
    newArray.push(newFood)
    console.log(newArray)
    emit('update-food-data', newArray)
    toast.success(`'${foodForm.food}' lisatud`, {
      maxtoasts: 3,
    })
    foodForm.clearForm()
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="grid justify-center content-center text-lg auto-rows-max">
    <div class="grid text-center h-25 pt-3">
      <label for="grammid">Grammid</label>
      <input v-model="foodForm.grams" type="number" name="grammid" id="" class="text-center">
    </div>

    <div class="grid text-center h-25 pt-3">
      <label for="süsivesikud">Süsivesikud</label>
      <input v-model="foodForm.carbs" type="number" name="süsivesikud" id="" class="text-center">
    </div>
    <div class="grid text-center h-25 pt-3">
      <label for="korruta">Korruta</label>
      <input v-model="foodForm.multiplier" type="number" name="korruta" id="" class="text-center">
    </div>

    <div class="grid text-center h-25 pt-3">
      <label for="toit">Toit</label>
      <input v-model="foodForm.food" type="text" name="toit" id="" class="text-center">
    </div>

    <p class="text-center mt-5 text-xl yh">
      {{ currentTotal }} ühikut
    </p>

    <button type="submit" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Lisa tabelisse</button>

  </form>
</template>
