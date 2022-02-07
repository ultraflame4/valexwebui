<template>
  <TableItem>
    <ButtonWIcon v-if="!selected" material_icon="check_box_outline_blank" @click="selected=true"></ButtonWIcon>
    <ButtonWIcon v-else material_icon="check_box" @click="selected=false"></ButtonWIcon>
  </TableItem>
  <TableItem>
    <p v-if="dockerCtn.Names!==undefined || dockerCtn.Names[0].length>0">{{ dockerCtn.Names[0] }}</p>
    <p v-else>{{ dockerCtn.Id }}</p>
  </TableItem>
  <TableItem style="justify-content: flex-end">
    <ButtonWIcon text="" class="utils-buttons text-success" material_icon="play_arrow" title="Start"></ButtonWIcon>

    <ButtonWIcon text="" class="utils-buttons " material_icon="replay" title="restart"></ButtonWIcon>
    <ButtonWIcon text="" class="utils-buttons" material_icon="download"
                 title="New update! Click to update and restart"></ButtonWIcon>
    <ButtonWIcon text="" class="utils-buttons" material_icon="more_horiz" title="See all"></ButtonWIcon>
  </TableItem>
  <TableItem>
    <div class="item-state" ref="state">
      <p>{{ dockerCtn.State }}</p>
    </div>
  </TableItem>
  <TableItem>
    <p v-if="dockerCtn.Image.length>0">{{ dockerCtn.Image }}</p>
    <p v-else>{{ dockerCtn.ImageID }}</p>
  </TableItem>
  <TableItem>
    <p>{{ getDateCreated() }}</p>
  </TableItem>
  <TableItem>
    <p>{{ formatPorts(dockerCtn.Ports) }}</p>
  </TableItem>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue"
import TableItem from "../../components/Table/TableItem.vue";
import {DockerContainer, DockerContainerPort, formatDockerContaienrPortsString} from "../../api";
import ButtonWIcon from "../../components/ButtonWIcon.vue";

export default defineComponent({
  name: "ContainerTableItem",
  components: {ButtonWIcon, TableItem},
  props: {
    dockerCtn: {
      type: Object as PropType<DockerContainer>,
      required: true
    }
  },
  data() {
    return {
      selected: false
    }
  },
  methods: {
    getDateCreated(): string {
      if (this.dockerCtn == undefined) {
        return ""
      }
      let date = new Date(this.dockerCtn.Created)
      return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} :: ${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
    },
    formatPorts(ports: DockerContainerPort[]): string {
      return formatDockerContaienrPortsString(ports)
    },
  }
})
</script>

<style scoped lang="scss">

</style>