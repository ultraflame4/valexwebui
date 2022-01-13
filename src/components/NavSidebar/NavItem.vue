<template>
  <div ref="navitem" class="nav-item" @click="openurl()">
    <p>{{ text }}</p>
    <span v-if="material_icon.length>0" class="material-icons icons">
    {{material_icon}}
    </span>
    <span v-if="mdi_icon.length>0" :class="`mdi icons ${mdi_icon}`">
    </span>
  </div>
</template>

<script lang="ts">
import {RouteLocation} from "vue-router";
import {defineComponent, ref} from "vue";

export default defineComponent({
  text: "NavItem",
  props: {
    text: {
      type: String,
      default: "nav-item"
    },
    material_icon: {
      type: String,
      default: ""
    },
    mdi_icon: {
      type: String,
      default: ""
    },
    url: {
      type: String,
      default: ""
    }
  },
  methods: {
    openurl() {
      this.$router.push(this.url)
    },

  },
  mounted() {
    this.$router.beforeEach((to: RouteLocation, from: RouteLocation, next: Function) => {

      let page = to.fullPath.split("/")[1]
      let el = <HTMLDivElement>this.$refs.navitem
      if (page == this.url) {

        el.classList.add("nav-item--active")
      } else {
        el.classList.remove("nav-item--active")
      }
      next()
    })
  }
});
</script>

<style lang="sass">
.nav-item
  @apply hover:bg-gray-700
  @apply text-gray-300
  width: 100%
  height: 48px
  cursor: pointer
  display: flex
  align-items: center
  padding: 0 15px
  margin: 4px 0
  border-radius: 7px
  font-size: 15px
  font-weight: bold
  letter-spacing: 1px
  justify-content: flex-start


  .icons
    justify-self: flex-end
    margin-left: auto
    font-size: 24px

.nav-item:active
  filter: brightness(70%)


.nav-item--active
  @apply bg-gray-300
  @apply hover:bg-gray-300
  @apply text-gray-800

</style>