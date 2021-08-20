<template>
<!--  <video id="videoPlayer" controls></video>-->
  <video data-dashjs-player="" autoplay="" src="http://192.168.56.99:8071/video/test/index.mpd" controls="true"></video>

</template>
<script>
export default {
  name: "remote",
  data(){
    return{

    }
  },

  methods:{

  },
  mounted() {
    this.$nextTick(() =>{
      (function(){
        let dashjs = require("dashjs")
        var url = "";
        var player = dashjs.MediaPlayer().create();
        player.initialize(document.querySelector("#videoPlayer"), url, false);
      })();
        }
    )


    // 只获取video:







  }
}
</script>

<style scoped>

</style>