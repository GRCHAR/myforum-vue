<template>

  <video id="videoPlayer" controls auto></video>

</template>


<script src="../js/dash.js"></script>
<script>
import dashjs from "../js/dash"
import env from "../config/env"
export default {
  name: "Video.vue",
  mounted() {
    console.log("this.$route.params.videoId:" , this.$route.params.videoId);
    var url = env.target + "/videoServer/video/" + this.$route.params.videoId + "/getDash";
    // var url = "http://192.168.56.124:8071/dash/test1.mpd"
    var player = dashjs.MediaPlayer().create();
    player.initialize(document.querySelector("#videoPlayer"), url, true);
  }
}
</script>

<style scoped>

video {
  width: 640px;
  height: 360px;
}
</style>