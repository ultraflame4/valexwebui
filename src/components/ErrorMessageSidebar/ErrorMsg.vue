<template>
  <div class="err-msg-ctn animate-appear" title="Enlarge" ref="ctn">
    <div class="msg-head">
      <div class="msg-title">
        <p>{{ msg.title }}</p>
      </div>
    </div>
    <div class="msg-body">
      <div class="msg-code">
        <p>
          <span style="font-weight: bold;letter-spacing: 1px">Code:</span>
          <span style="margin-left: 8px;">{{ msg.code }}</span>
        </p>
      </div>
      <div class="msg-contents">
        {{ msg.message }}
      </div>
    </div>
    <div class="coutdown-slider" ref="cd-slider">

    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue"
import ErrorSidebar, {ErrorMsgObj} from "./ErrorSidebar.vue";

const ErrorDuration = 5000 // in ms

export default defineComponent({
  name: "ErrorMsg",
  props: {
    msg: {
      type: Object as PropType<ErrorMsgObj>,
      required: true
    }
  },

  data() {
    return {
      countdown:-1,
      slideout:-1,
      removeMsg:-1,
    }
  },
  mounted() {
    this.countdown=setTimeout(() => {
      let el = (<HTMLDivElement>this.$refs["cd-slider"]);
      if (el != null){
        el.style.transition = `width linear ${ErrorDuration}ms`
        el.style.width = "0"
      }
    }, 500)


    this.slideout=setTimeout(() => {
      let ctn = (<HTMLDivElement>this.$refs["ctn"]);
      if (ctn != null)
      {
        ctn.classList.remove("animate-appear")
        ctn.classList.add("animate-bye")
        ctn.style.left = "110%"
      }
    }, ErrorDuration+500)

    this.removeMsg=setTimeout(() => {
      // remove elemen directly from DOM
      (<HTMLDivElement>this.$refs.ctn).remove()
      // @ts-ignore
      this.$parent.removeLastMsg();

    }, ErrorDuration+500+600)

  },
  beforeUnmount() {
    clearTimeout(this.countdown)
    clearTimeout(this.slideout)
    clearTimeout(this.removeMsg)
    // // @ts-ignore
    // this.$parent.removeLastMsg()
  }


})
</script>

<style scoped lang="sass">
.err-msg-ctn
  width: 100%
  min-height: 150px
  height: 150px
  background: rgb(125, 0, 0)
  color: aliceblue
  border-radius: 12px
  pointer-events: all
  filter: drop-shadow(0px 0px 4px #000)
  position: relative

  .msg-head
    height: 30px
    background: rgb(175, 0, 0)
    padding: 0 12px
    display: flex
    font-weight: bold
    letter-spacing: 1px
    align-items: center

  .msg-body
    display: flex
    flex-direction: column
    padding: 8px
    gap: 4px

  .coutdown-slider
    position: absolute
    bottom: 0
    height: 4px
    border-radius: 4px
    width: 100%
    background-color: #ccc

  .msg-contents
    font-size: 14px


.animate-appear
  animation-name: msg-appear
  animation-duration: 0.5s


@keyframes msg-appear
  0%
    left: 100%
  100%
    left: 0

.animate-bye
  animation-name: msg-bye
  animation-duration: 0.6s

@keyframes msg-bye
  0%
    left: 0
  100%
    left: 110%


</style>