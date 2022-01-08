<template>
  <div id="container-ctn">
    <div class="view-header">
      <h1>Docker Containers</h1>
    </div>
    <div id="container-list-controls">

    </div>
    <div id="container-list">

    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Containers"
}
</script>

<style lang="sass">
@import "@/assets/reset"

#container-ctn
  @extend .view-root
  gap: 20px
  #container-list-controls
    @apply bg-gray-800
    width: 100%
    height: 60px
    border-radius: 10px

  #container-list
    @apply bg-gray-800
    width: 100%
    flex-grow: 1
    border-radius: 10px

</style>