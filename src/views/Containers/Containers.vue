<template>
  <div id="container-ctn">
    <div class="view-header">
      <h1>Docker Containers</h1>
    </div>
    <Table>

      <template v-slot:actions>
        <ButtonWIcon text="Start" material_icon="play_arrow"/>
        <ButtonWIcon text="Stop" material_icon="stop"/>
        <ButtonWIcon text="Kill" mdi_icon="mdi-sword-cross"/>
        <ButtonWIcon text="Pause" material_icon="pause"/>
        <ButtonWIcon text="Resume" mdi_icon="mdi-play-circle"/>
        <ButtonWIcon text="Restart" material_icon="restart_alt"/>
        <ButtonWIcon text="Add" material_icon="add_box"/>
        <ButtonWIcon text="Remove" material_icon="delete"/>
      </template>

      <template v-slot:cols>
        <col style="width: 4%">
        <col style="width: 21%">
        <col style="width: 12%">
        <col style="width: 6%">
        <col style="width: 21%">
        <col style="width: 12%">
        <col style="width: 14%">
      </template>

      <template v-slot:headers>
        <th>X</th>
        <th>Name</th>
        <th>Actions</th>
        <th>State</th>
        <th>Image</th>
        <th>Date Created</th>
        <th>Published Ports</th>
      </template>
      <template v-slot:body>
        <TableRow v-for="container in containers">
          <ContainerTableItem :docker-ctn="container"></ContainerTableItem>
        </TableRow>
      </template>
    </Table>
  </div>
</template>

<script lang="ts">
import ButtonWIcon from "../../components/ButtonWIcon.vue";
import {defineComponent, PropType} from "vue";
import {DockerContainer, DockerContainerPort, getListOfContainers, startContainers} from "../../api";
import ContainersList from "./ContainersList.vue";
import Table from "@/components/Table/Table.vue";
import TableRow from "../../components/Table/TableRow.vue";
import TableItem from "../../components/Table/TableItem.vue";
import ContainerTableItem from "./ContainerTableItem.vue";

export default defineComponent({
  text: "Containers",
  components: {ContainerTableItem, TableItem, TableRow, Table, ContainersList, ButtonWIcon},
  data() {
    return {
      containers:new Array<DockerContainer>()
    }
  },
  methods: {
    start_selected() {
      // @ts-ignore
      let containers = this.$refs["container-list"].getAllSelectedContainers()
      startContainers(containers).then((data) => {
        // @ts-ignore
        this.$refs["container-list"].$forceUpdate()
        console.log(`Data: ${data}`)
      }).catch((code) => {

      })
    },

    updateContainerList() {
      getListOfContainers().then(value => {
        this.containers = value
      })
    },

    getAllSelectedContainers(): DockerContainer[] {
      let array = new Array<DockerContainer>();
      if (!Array.isArray(this.$refs["container-items"])) {
        // @ts-ignore
        if (this.$refs["container-items"].selected) {
          // @ts-ignore
          array.push(this.$refs["container-items"].dockerCtn)
        }
      }
      return array
    }
  },
  beforeMount() {
    this.updateContainerList();
  }
})
</script>

<style lang="scss">
@import "../../assets/global";

#container-ctn {
  @extend .view-root;
  gap: 20px;

  #container-list-ctn {
    @apply bg-gray-800;
    max-width: 100%;
    flex-grow: 1;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
  }

  #container-list-controls {
    @apply bg-gray-700;
    width: 100%;
    min-height: 60px;
    max-height: fit-content;
    border-bottom: 2px solid;
    @apply border-gray-900;
    display: flex;
    gap: 4px;
    padding: 0 8px;
    align-items: center;
    flex-wrap: wrap;
  }

}
</style>