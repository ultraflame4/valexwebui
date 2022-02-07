<template>
  <div class="table-ctn">
    <div class="table-controls">
      <slot name="actions"></slot>
    </div>
    <div class="table-content">
      <table>
        <colgroup>
          <slot name="cols">

          </slot>
        </colgroup>
        <thead>
        <tr>
          <slot name="headers"></slot>
        </tr>
        </thead>
        <tbody>
          <slot name="body"></slot>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import ButtonWIcon from "../ButtonWIcon.vue";


export default defineComponent({
  name: "Table",
  components: {
    ButtonWIcon
  }
})
</script>

<style scoped lang="scss">

.table-controls {
  @apply bg-gray-700;
  @apply border-gray-900;
  width: 100%;
  min-height: 60px;
  max-height: fit-content;
  border-bottom: 2px solid;
  display: flex;
  gap: 4px;
  padding: 0 8px;
  align-items: center;
  flex-wrap: wrap;
}

.table-ctn {
  @apply bg-gray-800;
  max-width: 100%;
  flex-grow: 1;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}


.table-content {
  @apply text-gray-400;
  width: 100%;
  flex-grow: 1;
  position: relative;
  overflow-y: auto;
}

table {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  flex-grow: 0;
  box-sizing: border-box;
  table-layout: fixed;
}

</style>