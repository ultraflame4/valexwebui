

<template>
  <div id="nav-sidebar">
    <div id="nav-header">
      <h1>
        ValexDock
      </h1>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: "NavSidebar"
}
</script>

<style lang="sass">

#nav-sidebar
  @apply bg-gray-800
  @apply text-gray-50
  width: 300px
  min-height: 100%
  display: flex
  flex-direction: column
  flex-shrink: 0
  flex-grow: 0
  padding: 0 10px
  #nav-header
    width: 100%
    height: 100px
    display: flex
    padding: 0 10px
    align-items: center
</style>