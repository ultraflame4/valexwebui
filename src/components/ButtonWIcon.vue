<template>
  <div class="text-gray-300 button-icon" @click="$router.push(url)">
    <span v-if="material_icon.length>0" class="material-icons icons">
    {{material_icon}}
    </span>
    <span v-if="mdi_icon.length>0" :class="`mdi icons ${mdi_icon}`">
    </span>
    <p v-if="text.length>0">{{ text }}</p>
  </div>
</template>

<script lang="ts">

import {defineComponent} from "vue";

export default defineComponent({
  text: "ButtonWIcon",
  props: {
    text: {
      type: String,
      default: ""
    },
    mdi_icon: {
      type: String,
      default: ""
    },
    material_icon: {
      type: String,
      default: ""
    },
    url: {
      type: String,
      default: ""
    },

  }
});
</script>

<style scoped lang="sass">
.button-icon

  width: fit-content
  min-width: fit-content
  height: 48px
  cursor: pointer
  display: flex
  align-items: center
  padding: 0 10px
  margin: 4px 0
  border-radius: 7px
  font-size: 15px
  font-weight: bold
  letter-spacing: 1px
  justify-content: center
  user-select: none
  background-color: inherit
  gap: 8px
  .icons
    font-size: calc(100% + 6px)

.button-icon:hover
  filter: brightness(125%)

.button-icon:active
  filter: brightness(70%)

</style>