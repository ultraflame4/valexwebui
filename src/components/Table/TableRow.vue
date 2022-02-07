<template>
  <tr class="table-row">
    <slot></slot>
  </tr>
</template>

<script lang="ts">
import {defineComponent} from "vue"

export default defineComponent({
  name: "TableRow"
})
</script>

<style scoped lang="scss">
.table-row {
  @apply text-gray-300;
  @apply bg-gray-800;

  min-height: 56px;
  height: 64px;
  max-height: fit-content;
  padding: 0 8px;
  width: 100%;
}

.table-row:hover{
  filter: brightness(110%);
}

</style>