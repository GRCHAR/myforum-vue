<template>
  <div id="videoContainer">
    <div class="liveBox">
       <video id="webcam"></video>
    </div>
   
    <div class="messageBox">
      <Card class="messageCard">
      <div v-for="item in messageList" :key="item.user" style="height:20px">
        {{item.user}}:{{item.message}}
      </div>
    </Card>
    </div>
    <div>
      <div class="messageInput">
       <Input v-model="inputMessage" type="textarea" :rows="4" placeholder="Enter something..." />
    </div>
    <div class="messageButton">
      <Button style="height:95px" @click="sendMessage()">发送</Button>
    </div>
    </div>
    
   
  </div>
</template>

<script>


import async from "async";
import * as json from "core-js";
import iframe from '../views/iframe.vue';

export default {
  components: { iframe },
  name: "WebRTC",
  data() {
    return {
      messageList:[],
      inputMessage: '',
      roomId:'test1',
      ws: null,
      countNumber: 0,
      _localStream:null,
      socketUserId: null,
      RTCConnect: null,
      RTCConnectList: new Map(),
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

  methods: {
    scrolltobottom(){
      chatbox.scrollTop=chatbox.scrollHeight;
    },
    sendMessage(){
      this.ws.send(JSON.stringify({
        event: "_message",
        userId: this.socketUserId,
        message: this.inputMessage,
        roomId: this.roomId
      }))
      this.inputMessage = ""
    },

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
    sendOfferFn(desc) {
      // 设置本地Offer
      this.RTCConnectList.forEach(value => {
        value.setLocalDescription(desc);
      });
      // 发送offer
      this.ws.send(JSON.stringify({
        "event": "_offer",
        "data": {
          "sdp": desc
        }
      }));
    },
    sendAnswerFn(desc, RTCConnect){ // 发送answer
      RTCConnect.setLocalDescription(desc);
      this.ws.send(JSON.stringify({ // 发送answer
        "event": "_answer",
        "data": {
          "sdp": desc
        }
      }));
    },

    async playStream(stream) {
      let video2 = document.createElement('video');
      video2.width = 200;
      video2.height = 200;
      let container = document.getElementById('videoContainer');
      container.insertBefore(video2, container.childNodes[0]);
      console.log(stream);
      video2.srcObject = await stream;
      console.log("video2:" + video2.getAttributeNames())
      await video2.play();
    }


  },
  mounted() {
    let vm = this;
    // vm.socketUserId = this.$store.getters.getUserId
    vm.socketUserId = vm.randomString(10);
    vm.ws = new WebSocket('ws://localhost:8075/ws');

    vm.ws.onopen = function (event) {
      console.log(event);
      var hello = {
        event: "open",
        userId: vm.socketUserId,
        roomId: vm.roomId,
        message: "hello"
      }
      vm.ws.send(JSON.stringify(hello));
    }

    vm.ws.onclose = function (event) {
      var goodBye = {
        event: "close",
        userId: vm.socketUserId,
        roomId: vm.roomId,
        message: "goodBye"
      }
      vm.ws.send(JSON.stringify(goodBye))
      console.log("close");
    }

    vm.ws.onerror = error => {
      console.log("Socket Error: ", error);
    };
    // vm.RTCConnect = new webkitRTCPeerConnection(vm.ice);

    if (RTCPeerConnection) (function () {
      console.log("浏览器支持实时音频通讯");
      // 这里面可以做其他操作
    })();else {
      console.log("您使用的浏览器暂不支持实时音频通讯。");
    }

    // vm.RTCConnect.onaddstream = function(event){
    //   console.log("A stream (id: '" + event.stream.id + "') has been added to this connection.");
    //   console.log(event.stream.getTracks());
    //   vm.playStream(event.stream);
    // };

    vm.ws.onmessage = function(event){
      console.log("event.data:" + event.data)
      var json = JSON.parse(event.data);
      if(json.hasOwnProperty("code")){
        if(json.code === '0'){
          console.log(typeof json.users);
          json.users = json.users.replace('[', "");
          json.users = json.users.replace(']', "");
          json.users = json.users.replace(" ", "");
          console.log("json.users" + json.users);
          json.users.split(",").forEach(user => {
            if(user !== ""){
              let RTConnect = new RTCPeerConnection(vm.ice);
              RTConnect.onicecandidate = function (event){
                console.log("onicecandidate", event);
                if (event.candidate !== null) {
                  vm.ws.send(JSON.stringify({
                    "event": "_ice_candidate",
                    "data": {
                      "candidate": event.candidate
                    }
                  }));
                }
              };
              // RTConnect.onicecandidateerror = function (event){
              //   console.log("onicecandidateerror:", event);
              // }
              RTConnect.ontrack = function(event){
                console.log("A stream (id: '" + event.stream.id + "') has been added to this connection.");
                console.log(event.streams[0].getTracks());
                vm.playStream(event.streams[0]);
              };
              RTConnect.onaddtrack = function (event) {
                console.log("addtrack event:", event);
              }
              RTConnect.createOffer().then(function(offer){
                console.log("MY OFFER! {}" , offer);
                console.log("RTConnect before setlocal:" + JSON.stringify(RTConnect));
                RTConnect.setLocalDescription(offer);
                console.log("RTConnect send:", RTConnect);
                console.log("RTConnect.localDescription:{}", RTConnect.localDescription)
                vm.ws.send(JSON.stringify({
                  "event": "_offer",
                  "toUserId": user,
                  "data": {
                    "sdp": offer
                  }
                }));
                console.log("before set:" + JSON.stringify(RTConnect));
                vm.RTCConnectList.set(user, RTConnect);
                console.log("affter set:", JSON.stringify(vm.RTCConnectList.values()[0]));
              });
              // RTConnect.createOffer(function (desc){
              //   console.log("createOffer desc:", desc);
              //   vm.setLocalDesc(desc, RTConnect, user);
              //   console.log("RTConnect:{}", RTConnect);
              //   // 发送offer
              //
              // },function (error){})

            }

          })
          console.log("code0:" + vm.RTCConnectList);
        }
        console.log("loginUser:vm.socketUserId " + json.loginUser+":"+vm.socketUserId);
        if(json.code === '1' && json.loginUser !== vm.socketUserId){
          console.log("json.code === 1");
          let RTConnect = new RTCPeerConnection(vm.ice);
          RTConnect.onicecandidate = function (event){
            console.log("onicecandidate");
            if (event.candidate !== null) {
              vm.ws.send(JSON.stringify({
                "event": "_ice_candidate",
                "data": {
                  "candidate": event.candidate
                }
              }));
            }
          };
          RTConnect.onaddstream = function(event){
            console.log("A stream (id: '" + event.stream.id + "') has been added to this connection.");
            console.log(event.stream.getTracks());
            vm.playStream(event.stream);
          };

          vm.RTCConnectList.set(json.loginUser, RTConnect);
          console.log("code1" + vm.RTCConnectList);
        }
      }

      console.log("json:" + JSON.stringify(json));
      if(json.event === "_message") {
        console.log("JSON USERID",json.userId)
        vm.messageList.push(
          {
            user: json.userId,
            message:json.message
          }
        )
      }
      //如果是一个ICE的候选，则将其加入到PeerConnection中，否则设定对方的session描述为传递过来的描述
      if( json.event === "_ice_candidate" ){
        console.log("_ice_candidate");

        vm.RTCConnectList.forEach((value, key) => {
          if(key === json.fromUserId){
            if(value.canTrickleIceCandidates){
              console.log("RTCConnet:{}", value);
              console.log("json.data.candidate:{}",json.data.candidate);
              value.addIceCandidate(new RTCIceCandidate(json.data.candidate));
            }
          }
        })
        // vm.RTCConnect.addIceCandidate(new RTCIceCandidate(json.data.candidate));
      } else {
        console.log("else _ice_candidate")
        console.log("event type:" + json.event);

        // 如果是一个offer，那么需要回复一个answer
        if(json.event === "_offer") {
          console.log("this is offer!!!!!!");
          vm.RTCConnectList.forEach((value, key) => {
            console.log("this is offer foreach!!!!!!" + json.fromUserId + ":" + key);
            if(key === json.fromUserId){
              console.log("this is offer foreach fromUserId!!!!!!");

              value.setRemoteDescription(new RTCSessionDescription(json.data.sdp));

              console.log("setRemoteDescription");
              value.createAnswer().then(function (answer){
                console.log("setLocalDescription");
                value.setLocalDescription(answer);
                vm.ws.send(JSON.stringify({ // 发送answer
                  "event": "_answer",
                  "toUserId": key,
                  "data": {
                    "sdp": answer
                  }
                }));
              })
              // then(function (){
              //   console.log("canTrickleIceCandidates");
              //       if (value.canTrickleIceCandidates) {
              //         console.log("canTrickleIceCandidates true");
              //         return value.localDescription;
              //       }
              //   console.log("canTrickleIceCandidates false");
              //       return new Promise(function (r){
              //         console.log("addEventListener");
              //         value.addEventListener('icegatheringstatechange',function (e){
              //           console("iceGatheringState complete");
              //           if (e.target.iceGatheringState === 'complete') {
              //             r(value.localDescription);
              //           }
              //         });
              //         console.log("addEventListener after");
              //       });
              //     }).catch(e => function (){
              //   console.log("error", e);
              // });
              // value.addEventListener('icecandidate', e => {
              //   if (value.canTrickleIceCandidates) {
              //     vm.ws.send(JSON.stringify({
              //       "event": "_ice_candidate",
              //       "data": {
              //         "candidate": e.candidate
              //       }
              //     })); // signaling message
              //   }
              // });
              // {
              //   console.log("value:", value);
              //   value.createAnswer()
              //   value.createAnswer(function (desc){
              //     console.log("createAnswer desc:", desc);
              //     console.log("localvalue:",value);
              //     // vm.setLocalDesc(desc, value, key);
              //     value.setLocalDescription(desc);
              //     vm.ws.send(JSON.stringify({ // 发送answer
              //       "event": "_answer",
              //       "toUserId": key,
              //       "data": {
              //         "sdp": desc
              //       }
              //     }));
              //   }, function (error) {
              //     console.log('Failure callback: ' + error);
              //   });
              // }

          // vm.RTCConnect.setRemoteDescription(new RTCSessionDescription(json.data.sdp));
          // vm.RTCConnect.createAnswer(vm.sendAnswerFn, function (error) {
          //   console.log('Failure callback: ' + error);
          // });
        }})}
        if (json.event === "_answer") {
          console.log("this is answer")
          vm.RTCConnectList.forEach((value, key) => {
            if (key === json.fromUserId) {
              value.setRemoteDescription(new RTCSessionDescription(json.data.sdp));
              console.log("value", value);
              // MediaStream.valueOf(vm._localStream).getTracks().forEach(track => {
              //   console.log("track:{}",track);
              //   value.addTrack(track);
              // });
              navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
              }).then(mediaStream =>{

                mediaStream.getTracks().forEach(track => {

                  console.log("get remote track:{}", track);
                  value.addTrack(track);
                  console.log("get media{}", vm.RTCConnectList);
                });
              })
            }
          })
          // vm.RTCConnect.setRemoteDescription(new RTCSessionDescription(json.data.sdp));
        }
      }
    };

    
//获取摄像头视频流!!!!!!!
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    }).then(mediaStream => {
      console.log("mediaStream:" + mediaStream);
      var video1 = document.querySelector("#webcam");
      console.log("video1:" + video1);
      video1.srcObject =  mediaStream;
      video1.play();

      
    });
















    


  },
  watch:{
    
  }
}
</script>

<style scoped>
.liveBox{
  display: inline-block;
  width: 500px;
  height: 500px;
  left:200px;
}
.messageBox {
  display: inline-block;
  margin-left: 200px;
}

.messageCard {
  /* display: inline-block; */
  overflow-y:scroll;
  max-height: 500px;
  word-wrap: break-word;
  line-height: 1.6rem;
  
  /* padding: 8px 16px; */
  /* box-shadow: 0 0 32px rgba(0 0 0 / 8%),0 16px 16px -16px rgb(0 0 0 / 10%); */
  text-align: left;
  width: 200px;
  height:480px;
  
  /* width: 100px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical; */
}

.messageInput {
  display: inline-block;
  width: 50%;
}

.messageButton{
  display: inline-block;
}

</style>