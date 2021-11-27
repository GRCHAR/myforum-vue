<template style="height: 100%">
  <div class="home" style="height: auto">
<!--    <img alt="Vue logo" src="../assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
<!--    <WebRTC style="overflow: hidden"></WebRTC>-->
<!--    <WebRTC style="overflow: hidden"></WebRTC>-->
<!--    <WebRTC style="overflow: hidden"></WebRTC>-->
<!--    <WebRTC style="overflow: hidden"></WebRTC>-->
<!--    <WebRTC style="overflow: hidden"></WebRTC>-->
<!--    <WebRTC style="overflow: hidden"></WebRTC>-->
<!--    <div style="overflow: hidden;height: 500px">hidden</div>-->
<!--    <div style="overflow: hidden;height: 500px">hidden</div>-->
<!--    <div style="overflow: hidden;height: 500px">hidden</div>-->
<!--    <div style="overflow: hidden;height: 500px">hidden</div>-->
<!--    <div style="overflow: hidden;height: 500px">hidden</div>-->
<!--    <div style="overflow: hidden;height: 500px">hidden</div>-->
<!--    <video height="100%" width="100%">-->
<!--      <source src="https://videogroup1.haier.com/masvod/public/2021/09/13/20210913_17bdd39b336_r1_800k.mp4" type="video/mp4"><source>-->
<!--    </video>-->
<!--    <div style="min-height: 500px">hidden</div>-->
<!--    <div style="min-height: 500px">hidden</div>-->
<!--    <div style="min-height: 500px">hidden</div>-->
<!--    <div style="min-height: 500px">hidden</div>-->
<!--    <div style="min-height: 500px">hidden</div>-->
    <input type="button" value="打开窗口" onclick="openWindow()" />
  </div>
</template>
<script>

function callback(value) {
  console.log(value);
}


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
