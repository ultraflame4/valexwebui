<template>
  <div id="container-list">
    <div id="list-overflow-ctn">
      <ContainerListItem :isheader="true"/>

      <ContainerListItem v-for="container in container_list"
                         :docker-ctn="container"
                         ref="container-items"
      >

      </ContainerListItem>

    </div>
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
  #list-overflow-ctn
    position: absolute
    width: 100%
    top: 0
    bottom: 0
    flex-grow: 0
    box-sizing: border-box
    overflow-y: auto

    table-layout: fixed

  th
    @apply bg-gray-800
    position: sticky
    top: 0
    height: 36px
    z-index: 1

</style>