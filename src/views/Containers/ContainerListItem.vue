<template>
<div v-if="!isheader&&dockerCtn!=undefined" class="container-list-items-ctn">
  <div class="item-checkbox">
    <ButtonWIcon v-if="!selected" material_icon="check_box_outline_blank" @click="selected=true"></ButtonWIcon>
    <ButtonWIcon v-else material_icon="check_box" @click="selected=false"></ButtonWIcon>
  </div>
  <div class="item-name">
    <p v-if="dockerCtn.Names[0].length>0">{{dockerCtn.Names[0]}}</p>
    <p v-else>{{dockerCtn.Id}}</p>
  </div>
  <div class="item-utils">
    <ButtonWIcon text="" class="utils-buttons" material_icon="menu"></ButtonWIcon>
    <ButtonWIcon text="" class="utils-buttons" material_icon="upgrade"></ButtonWIcon>
  </div>
  <div class="item-state" ref="state">
    <p>{{dockerCtn.State}}</p>
  </div>
  <div class="item-image">
    <p v-if="dockerCtn.Image.length>0">{{dockerCtn.Image}}</p>
    <p v-else>{{dockerCtn.ImageID}}</p>
  </div>
  <div class="item-datecreated">
    <p>{{getDateCreated()}}</p>
  </div>
  <div class="item-ports">
    <p>{{formatPorts(dockerCtn.Ports)}}</p>
  </div>
</div>
<div v-else class="container-list-items-ctn header">
  <div class="item-checkbox">
    <ButtonWIcon material_icon="check_box"></ButtonWIcon>
  </div>
  <div class="item-name">
    <p>Name</p>
  </div>
  <div class="item-utils">
    <p>Utils</p>
  </div>
  <div class="item-state" ref="state">
    <p>State</p>
  </div>
  <div class="item-image">
    <p>Image</p>
  </div>
  <div class="item-datecreated">
    <p>Created</p>
  </div>
  <div class="item-ports">
    <p>Published ports</p>
  </div>
</div>
</template>

<script lang="ts">
import {defineComponent, PropType, reactive} from "vue";
import {DockerContainer, DockerContainerPort, formatDockerContaienrPortsString} from "../../api";
import ButtonWIcon from "../../components/ButtonWIcon.vue";

export default defineComponent({
  components: {ButtonWIcon},
  dockerName: "ContainerListItem",
  props:{
    isheader:{
      type: Boolean,
      default:false,
      required:false
    },
    dockerCtn:{
      type: Object as PropType<DockerContainer>,
      required:false
    }
  },
  methods: {
    refresh(){
      if (this.dockerCtn == undefined){
        return
      }
      if (this.dockerCtn.State == "Exited"){
        (<HTMLDivElement>this.$refs.state).classList.add("bg-danger")
      }
    },
    formatPorts(ports:DockerContainerPort[]):string{
      return formatDockerContaienrPortsString(ports)
    },
    getDateCreated():string{
      if (this.dockerCtn == undefined){
        return ""
      }
      let date = new Date(this.dockerCtn.Created)
      return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} :: ${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
    }
  },
  data(){
    return {
      selected:false
    }
  },
  mounted() {
    if (!(this.isheader||this.dockerCtn == undefined)){
      this.refresh();
    }
  }
})
</script>

<style lang="sass" scoped>
.header
  font-weight: bold
  @apply text-gray-400

.container-list-items-ctn
  @apply text-gray-300
  @apply bg-gray-800

  min-height: 56px
  max-height: fit-content
  display: flex
  gap: 16px

  justify-content: flex-start
  align-items: center
  padding: 0 8px

  *
    height: fit-content

  .item-checkbox
    width: fit-content
    flex-shrink: 0
    flex-grow: 0
    padding: 0

  .item-name
    display: flex
    flex-grow: 1
    justify-content: center

  .item-state
    padding: 4px 0
    border-radius: 8px
    height: 32px
    width: 90px
    display: flex
    justify-content: center
  .item-image
    flex-grow: 1
    display: flex
    justify-content: center

  .item-datecreated
    display: flex
    width: 260px
    justify-content: center

  .item-ports
    width: 200px
    display: flex
    justify-content: center


  .item-utils
    display: flex
    gap: 4px
    width: 72px
    justify-content: center
    align-items: center

    .utils-buttons
      height: 32px
      width: 32px
      padding: 0
      font-size: 16px


.container-list-items-ctn:hover
  filter: brightness(110%)


</style>