<template>
  <div class="spinner" :style="`width:${radius}px;height:${radius}px` "></div>
</template>

<script lang="ts">
import {defineComponent} from "vue"

export default defineComponent({
  name: "Spinner",
  props:{
    radius:{
      type:Number,
      default:20
    }
  }
})
</script>

<style scoped lang="sass">
.spinner
  //background-color: #a22626
  border-radius: 100%
  border-width: medium
  border-color: #00000000
  @apply border-l-gray-300
  animation: spin 1.5s infinite linear

@keyframes spin
  0%
    transform: rotate(0)
  100%
    transform: rotate(360deg)

</style>