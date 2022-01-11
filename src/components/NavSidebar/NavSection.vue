<template>
  <div class="nav-section">
    <p>
      {{text}}
    </p>
  </div>
</template>

<script lang="ts">
export default {
  text: "NavSection",
  props: {
    text: {
      type: String,
      default: ""
    }
  }
}
</script>

<style lang="sass">
.nav-section
  @apply text-gray-400
  padding: 0 15px
  font-weight: bold
  font-size: 13px
  letter-spacing: 1px
  height: 25px
  display: flex
  align-content: center
  margin-top: 20px

</style>