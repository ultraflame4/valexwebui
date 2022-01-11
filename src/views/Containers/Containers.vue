<template>
  <div id="container-ctn">
    <div class="view-header">
      <h1>Docker Containers</h1>
    </div>

    <div id="container-list-ctn">
      <div id="container-list-controls">
        <ButtonWIcon text="Start" material_icon="play_arrow" @click="start_selected()"/>
        <ButtonWIcon text="Stop" material_icon="stop"/>
        <ButtonWIcon text="Kill" mdi_icon="mdi-sword-cross"/>
        <ButtonWIcon text="Pause" material_icon="pause"/>
        <ButtonWIcon text="Resume" mdi_icon="mdi-play-circle"/>
        <ButtonWIcon text="Restart" material_icon="restart_alt"/>
        <ButtonWIcon text="Add" material_icon="add_box"/>
        <ButtonWIcon text="Remove" material_icon="delete"/>
      </div>
      <ContainersList ref="container-list"/>
    </div>
  </div>
</template>

<script lang="ts">
import ButtonWIcon from "../../components/ButtonWIcon.vue";
import {defineComponent} from "vue";
import {DockerContainer, getListOfContainers, startContainers} from "../../api";
import ContainersList from "./ContainersList.vue";
import {pushErrorMsg} from "../../components/ErrorMessageSidebar/ErrorSidebar.vue";

export default defineComponent({
  text: "Containers",
  components: {ContainersList, ButtonWIcon},
  methods:{
    start_selected(){
      let containers = this.$refs["container-list"].getAllSelectedContainers()
      startContainers(containers).then((data)=>{
        this.$refs["container-list"].$forceUpdate()
        console.log(`Data: ${data}`)
      }).catch((code)=>{

      })
    }
  }
})
</script>

<style lang="sass">
@import "@/assets/global"

#container-ctn
  @extend .view-root
  gap: 20px

  #container-list-ctn
    @apply bg-gray-800
    max-width: 100%
    flex-grow: 1
    border-radius: 8px
    display: flex
    flex-direction: column

  #container-list-controls
    @apply bg-gray-700
    width: 100%
    min-height: 60px
    max-height: fit-content
    border-bottom: 2px solid
    @apply border-gray-900
    display: flex
    gap: 4px
    padding: 0 8px
    align-items: center
    flex-wrap: wrap

</style>