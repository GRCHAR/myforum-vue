<template>

  <video id="videoPlayer" controls autoplay="true"></video>
<!--  <Input v-model="value" style="width: 300px" />-->
</template>


<script src="../js/dash.js"></script>
<script>
import dashjs from "../js/dash"
import env from "../config/env"
export default {
  name: "Live",
  data(){

    return{
      ws: null,
      // socketUserId: this.$route.params.userId
      socketUserId: 1,
      value: 0,
    }

  },
  mounted() {
    let vm = this;
    // this.ws = new WebSocket('ws://localhost:8070/webSocket/' + this.socketUserId);
    // this.ws.onopen = function (event){
    //   let message = {
    //     message: "hello"
    //   };
    //   vm.ws.send(JSON.stringify(message));
    // }
    // this.ws.onclose = function (event) {
    //   console.log("close");
    // }
    // this.ws.onmessage = function (event) {
    //
    // }
    // var url = env.target + "/dash/" + this.$route.params.liveId + ".mpd"
    var url = "http://47.93.125.10/dash/test1.mpd"
    var player = dashjs.MediaPlayer().create();
    player.initialize(document.querySelector("#videoPlayer"), url, true);
  },
  methods:{
    sendMessage(message){
      let myMessage = {
        message: message
      }
      this.ws.send(JSON.stringify(myMessage));
    }
  }
}
</script>

<style scoped>

video {
  width: 640px;
  height: 360px;
}
</style>