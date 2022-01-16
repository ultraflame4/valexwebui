<template>
  <div id="container-list">
    <table id="list-overflow-ctn">
      <colgroup>

        <col style="width: 4%">
        <col style="width: 20%">
        <col style="width: 12%">
        <col style="width: 8%">
        <col style="width: 20%">
        <col style="width: 12%">
        <col style="width: 14%">

      </colgroup>
      <thead>
      <tr>
        <th>X</th>
        <th>Name</th>
        <th>Actions</th>
        <th>State</th>
        <th>Image</th>
        <th>Date Created</th>
        <th>Published Ports</th>
      </tr>
      </thead>
      <tbody>
        <ContainerListItem v-for="container in container_list"
                           :docker-ctn="container"
                           ref="container-items"
        >

        </ContainerListItem>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import ContainerListItem from "./ContainerListItem.vue";
import {DockerContainer, getListOfContainers} from "../../api";
import {defineComponent} from "vue";
import ButtonWIcon from "../../components/ButtonWIcon.vue";

export default defineComponent({
  dockerName: "ContainersList",
  components: {ButtonWIcon, ContainerListItem},
  data() {
    return {
      container_list: new Array<DockerContainer>()
    }
  },
  methods: {
    updateContainerList() {
      getListOfContainers().then(value => {
        this.container_list = value
        console.log(this.container_list)

      })
    },
    getAllSelectedContainers():DockerContainer[] {
      let array = new Array<DockerContainer>();
      if (!Array.isArray(this.$refs["container-items"])){
        // @ts-ignore
        if (this.$refs["container-items"].selected){
          // @ts-ignore
          array.push(this.$refs["container-items"].dockerCtn)
        }
        return array
      }


      this.$refs["container-items"].forEach(value => {
        if (value.selected) {
          array.push(value.dockerCtn)
        }
      });
      return array
    }
  },
  mounted() {
    this.updateContainerList()
  }
});
</script>

<style scoped lang="sass">
#container-list
  @apply text-gray-400
  width: 100%
  flex-grow: 1
  position: relative
  overflow-y: auto

  #list-overflow-ctn
    position: absolute
    width: 100%
    top: 0
    bottom: 0
    flex-grow: 0
    box-sizing: border-box
    table-layout: fixed




</style>