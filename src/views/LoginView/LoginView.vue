<template>
  <div id="login-view-ctn" ref="ctn">
    <div id="login-input-ctn">
      <div id="login-input">
        <div class="text-gray-200 font-bold title">
          <p>ValexDock</p>
        </div>
        <div class="login-input">
          <input class="bg-gray-700 text-gray-300" type="password" placeholder="Enter key" ref="login-key" v-on:keydown.enter="attemptApilogin()"/>
        </div>
        <ButtonWIcon v-if="!debug_key" text="Login" style="font-size: 32px;height: fit-content;background-color: #00000000"
                     material_icon="login" @click="attemptApilogin()"></ButtonWIcon>

        <ButtonWIcon v-else text="Activate Debug Mode" style="font-size: 32px;height: fit-content;background-color: #00000000"
                     material_icon="build" @click="attemptApilogin()"></ButtonWIcon>

      </div>
    </div>
    <div id="login-wait-ctn">
      <div id="login-spinner">
        <span class="mdi mdi-shield-lock-outline" style="font-size: 124px"/>
        <div class="spinner-ctn">
          <Spinner :radius="400"></Spinner>
        </div>
      </div>
      <p>
        Logging In
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import ButtonWIcon from "@/components/ButtonWIcon.vue";
import * as api from "../../api";
import Spinner from "../../components/Spinner.vue";


export default defineComponent({
  name: "LoginView",
  components: {Spinner, ButtonWIcon},
  data() {
    return {
      pendingLogin: false,
      debug_key: false
    }
  },
  mounted() {
    window.addEventListener("keydown" ,(e)=>{
      if (e.ctrlKey && e.altKey && e.shiftKey){
        this.debug_key=true
      }
    })

    window.addEventListener("keyup",(e)=>{
      if (!(e.ctrlKey && e.altKey && e.shiftKey)){
        this.debug_key=false
      }
    })
  },
  methods:{
    attemptApilogin(){
      if (this.pendingLogin || api.isLoggedIn()){
        return
      }

      if (this.debug_key){
        api.SetDebugMode(true)

        return
      }


      this.pendingLogin=true;
      (<HTMLDivElement>this.$refs.ctn).scrollBy({
        behavior: "smooth",
        top: window.innerHeight
      })

      setTimeout(()=>{
        api.apiLogin((<HTMLInputElement>this.$refs["login-key"]).value)
            .then(() => {

            })
            .catch(()=>{

            })
            .finally(()=>{
              setTimeout(()=>{
                this.pendingLogin=false;
                (<HTMLDivElement>this.$refs.ctn).scrollBy({
                  behavior: "smooth",
                  top: -window.innerHeight
                })
              },1000)
            })
      },500)

    }
  }
})
</script>

<style scoped lang="sass">
#login-view-ctn
  height: 100vh
  width: 100%
  display: flex
  flex-direction: column
  scroll-snap-type: y mandatory

  *
    scroll-snap-align: start

  #login-input-ctn
    min-height: 100vh
    max-height: 100vh
    width: 100%
    display: flex
    justify-content: center
    align-items: center

    #login-input
      @apply bg-gray-800
      height: fit-content
      width: fit-content
      border-radius: 12px
      display: flex
      align-items: center
      justify-content: center
      padding: 64px
      flex-direction: column
      gap: 32px

      .title
        font-size: 48px
        letter-spacing: 1px
        display: flex
        justify-content: center
        align-items: center

      .label
        width: 100%
        font-weight: bold
        font-size: 24px

      .login-input
        width: 500px
        height: 50px
        border-radius: 8px

        input
          padding: 0 16px
          width: 100%
          height: 100%

  #login-spinner
    width: 100%
    display: flex
    justify-content: center
    align-items: center


  #login-wait-ctn
    width: 100%
    min-height: 100vh
    max-height: 100vh
    display: flex
    align-items: center
    justify-content: center
    color: white
    position: relative
    flex-direction: column

  .spinner-ctn
    position: absolute
    width: 100%
    height: 100%
    display: flex
    justify-content: center
    align-items: center

</style>