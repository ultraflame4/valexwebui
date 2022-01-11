<template>
  <div id="login-view-ctn">
    <div id="login-input-ctn">
      <div id="login-input">
        <div class="text-gray-200 font-bold title">
          <p>ValexDock</p>
        </div>
        <div class="login-input">
          <input class="bg-gray-700 text-gray-300" type="password"/>
        </div>
        <ButtonWIcon text="Login" style="font-size: 32px;height: fit-content;background-color: #00000000"
                     material_icon="login"></ButtonWIcon>
      </div>
    </div>
    <div id="login-wait-ctn">
      <p class="text-gray-300">Waiting for login...</p>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import ButtonWIcon from "../../components/ButtonWIcon.vue";

export default defineComponent({
  name: "LoginView",
  components: {ButtonWIcon}
})
</script>

<style scoped lang="sass">
#login-view-ctn
  height: 100vh
  width: 100%
  display: flex
  overflow-y: auto
  flex-direction: column

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
          padding: 8px
          width: 100%
          height: 100%


  #login-wait-ctn
    width: 100%
    min-height: 100vh
    max-height: 100vh
    display: flex
    align-items: center
    justify-content: center

</style>