<template>
  <div class="home">
<!--    <img alt="Vue logo" src="../assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <WebRTC></WebRTC>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import WebRTC from "@/components/WebRTC";

export default {
  name: 'Home',
  components: {
    HelloWorld,
    WebRTC
  },
  
}
</script>
