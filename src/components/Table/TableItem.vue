<template>
<td>
  <div :style="style">
    <slot></slot>
  </div>
</td>
</template>

<script lang="ts">
import {defineComponent} from "vue"

export default defineComponent({
  name: "TableItem",
  props:{
    style:{
      type:String,
      default:""
    }
  }

})
</script>

<style scoped lang="scss">
div {
  width: 100%;
  height: 100%;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>