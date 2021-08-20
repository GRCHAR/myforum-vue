<template>
  <video id="webcam" WIDTH="1280" HEIGHT="720"></video>
</template>

<script>
export default {
  name: "WEBRTCGetter",
  data() {
    return {
      ws: null,
      countNumber: 0,
      _localStream:null,
      socketUserId:null,
      RTCConnect: null,
      ice: {
        "iceServers": [{
          "urls" : ["stun:stun.l.google.com:19302"]
        }, {
          "urls" : ["turn:numb.viagenie.ca"],
          "username" : "webrtc@live.com",
          "credential" : "muazkh"
        }]
      }
    }
  },

  methods:{
    randomString(len) {
      len = len || 32;
      var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
      /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
      var maxPos = $chars.length;
      var pwd = '';
      for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd;
    },

    sendAnswerFn(desc){ // 发送answer
      this.RTCConnect.setLocalDescription(desc); // 设置本地Offer
      this.ws.send(JSON.stringify({ // 发送answer
        "event": "_answer",
        "data": {
          "sdp": desc
        }
      }));
    },

    async playStream(stream) {

      var video2 = document.querySelector("#get1");
      console.log(stream);
      video2.srcObject = await stream;
      console.log("video2:" + video2.getAttributeNames())
      video2.play();
    }

  },
  mounted() {

  }
}
</script>

<style scoped>

</style>