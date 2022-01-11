<!--This component is a sidebar for displaying error messages.-->

<template>
  <div id="ErrorMsgLog" ref="ctn">
    <ErrorMsg v-for="(msg,index) in MsgQueue"
              :key="index"
              :msg="msg"
    ></ErrorMsg>
  </div>
</template>

<script lang="ts">
import {createApp, defineComponent} from "vue"

import ErrorMsg from "./ErrorMsg.vue";

export type ErrorMsgObj = {
  title:string
  code: string|number
  message:string
}

let pushErrorMsg_:CallableFunction | undefined = undefined

export function pushErrorMsg(msg:ErrorMsgObj){
  if (pushErrorMsg_ != undefined){
    pushErrorMsg_(msg);
  }
}


const component = defineComponent({
  name: "ErrorSidebar",
  components: {ErrorMsg},
  data() {
    return {
      MsgQueue: new Array<ErrorMsgObj>()
    }
  },
  methods:{
    pushErrMsg(message:ErrorMsgObj){
      this.MsgQueue.push(message)
    },
    removeLastMsg(){
      // Remove element directly isntead of removing from queue
      // only check if all elements are removed, then empty queue.
      if ((<HTMLDivElement> this.$refs.ctn).children.length == 0){
        this.MsgQueue = new Array<ErrorMsgObj>()
      }


      // this.MsgQueue.shift()
      // console.log(this.MsgQueue)
    }
  },
  mounted(){
    pushErrorMsg_ = this.pushErrMsg

  }

})

export default component
const testMsg = {
  title: "TEST",
  code: "1",
  message: "THIS IS A TEST"
}


</script>

<style scoped lang="sass">
#ErrorMsgLog
  position: absolute
  right: 0
  top: 8px
  bottom: 0
  width: 400px
  display: flex
  z-index: 2
  flex-direction: column
  padding: 8px
  gap: 8px
  overflow-y: auto
  pointer-events: none
</style>