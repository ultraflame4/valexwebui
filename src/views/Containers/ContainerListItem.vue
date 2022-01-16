<template>
<tr v-if="dockerCtn!==undefined" class="container-list-items-ctn">
  <td>
    <div class="item-checkbox">
      <ButtonWIcon v-if="!selected" material_icon="check_box_outline_blank" @click="selected=true"></ButtonWIcon>
      <ButtonWIcon v-else material_icon="check_box" @click="selected=false"></ButtonWIcon>
    </div>
  </td>
  <td class="item-name">
    <p v-if="dockerCtn.Names!==undefined || dockerCtn.Names[0].length>0">{{dockerCtn.Names[0]}}</p>
    <p v-else>{{dockerCtn.Id}}</p>
  </td>
  <td>
    <div class="item-utils">
      <ButtonWIcon text="" class="utils-buttons" material_icon="menu"></ButtonWIcon>
      <ButtonWIcon text="" class="utils-buttons" material_icon="upgrade"></ButtonWIcon>
    </div>
  </td>
  <td>
    <div class="item-state" ref="state">
      <p>{{dockerCtn.State}}</p>
    </div>
  </td>
  <td class="item-image">
    <p v-if="dockerCtn.Image.length>0">{{dockerCtn.Image}}</p>
    <p v-else>{{dockerCtn.ImageID}}</p>
  </td>
  <td class="item-datecreated">
    <p>{{getDateCreated()}}</p>
  </td>
  <td class="item-ports">
    <p>{{formatPorts(dockerCtn.Ports)}}</p>
  </td>
</tr>

</template>

<script lang="ts">
import {defineComponent, PropType, reactive} from "vue";
import {DockerContainer, DockerContainerPort, formatDockerContaienrPortsString} from "../../api";
import ButtonWIcon from "../../components/ButtonWIcon.vue";

export default defineComponent({
  components: {ButtonWIcon},
  dockerName: "ContainerListItem",
  props:{
    dockerCtn:{
      type: Object as PropType<DockerContainer>,
      required:false
    }
  },
  setup(props) {
    console.log(props.dockerCtn)
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
    if (!(this.dockerCtn == undefined)){
      this.refresh();
    }
  }
})
</script>

<style lang="sass" scoped>


.container-list-items-ctn
  @apply text-gray-300
  @apply bg-gray-800

  min-height: 56px
  max-height: fit-content

  padding: 0 8px
  width: 100%

  //*
  //  height: fit-content
  //  display: flex
  //  justify-content: center
  //  align-items: center

  .item-state
    padding: 4px 4px
    border-radius: 8px
    display: flex
    justify-content: center
    width: calc(100% - 8px)
    background-color: #a22626


  .item-checkbox
    display: flex
    height: 100%
    width: 100%
    justify-content: center
    align-items: center

  .utils-buttons
    height: 32px
    width: 32px
    padding: 0
    font-size: 16px

  .item-utils
    display: flex
    height: 100%
    width: 100%
    justify-content: center
    align-items: center

  td
    vertical-align: center
    text-align: center



.container-list-items-ctn:hover
  filter: brightness(110%)


</style>