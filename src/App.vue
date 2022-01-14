<template>
  <NavSidebar>
    <NavSection text="Home"/>
    <NavItem text="Dashboard" material_icon="dashboard" url="dashboard"/>

    <NavSection text="Docker"/>
    <NavItem text="Containers" material_icon="dns" url="containers"/>
    <NavItem text="Images" material_icon="collections" url="images"/>
    <NavSection text="Others"/>
    <NavItem text="Watcher" mdi_icon="mdi-eye-refresh" url="watcher"/>
    <NavSection text="Session"/>
    <NavItem text="Logout" material_icon="logout" @click="api.apiLogout()"/>

  </NavSidebar>
  <ErrorSidebar></ErrorSidebar>
  <router-view></router-view>
</template>

<script setup lang="ts">
import NavSidebar from "@/components/NavSidebar/NavSidebar.vue"
import NavItem from "./components/NavSidebar/NavItem.vue";
import NavSection from "./components/NavSidebar/NavSection.vue";
import * as api from "./api"
import ErrorSidebar from "./components/ErrorMessageSidebar/ErrorSidebar.vue";

function onLogout() {
  api.apiLogout()
}

</script>

<style lang="sass">
@import "assets/colors"
#app
  @apply bg-gray-900
  width: 100vw
  min-height: 100vh
  max-height: fit-content
  display: flex

</style>
