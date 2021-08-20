<template>
  <div id="videoContainer">
    <video id="webcam"></video>
  </div>
</template>

<script>


import async from "async";
import * as json from "core-js";

export default {
  name: "WebRTC",
  data() {
    return {
      ws: null,
      countNumber: 0,
      _localStream:null,
      socketUserId:null,
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
    vm.socketUserId = vm.randomString(10);
    vm.ws = new WebSocket('ws://localhost:8070/webSocket/' + vm.socketUserId);

    vm.ws.onopen = function (event) {
      console.log(event);
      var hello = {
        toUserId: vm.socketUserId,
        message: "hello"
      }
      vm.ws.send(JSON.stringify(hello));
    }
    vm.ws.onclose = function (event) {
      console.log("close");
    }
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
              let RTConnect = new webkitRTCPeerConnection(vm.ice);
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
              RTConnect.onicecandidateerror = function (event){
                console.log("onicecandidateerror:", event);
              }
              RTConnect.ontrack = function(event){
                console.log("A stream (id: '" + event.stream.id + "') has been added to this connection.");
                console.log(event.streams[0].getTracks());
                vm.playStream(event.streams[0]);
              };
              RTConnect.createOffer().then(function(offer){
                console.log("RTConnect before setlocal:" + JSON.stringify(RTConnect));
                navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
              }).then(mediaStream => {
                let result = RTConnect.setLocalDescription(offer);
                console.log("RTConnect", RTConnect);
                return result;
              })
              RTConnect.setLocalDescription(offer);
                
              }).then(function (){
                console.log("RTConnect send:", RTConnect);
                vm.ws.send(JSON.stringify({
                  "event": "_offer",
                  "toUserId": user,
                  "data": {
                    "sdp": RTConnect.localDescription
                  }
                }));
                console.log("before set:" + JSON.stringify(RTConnect));
                vm.RTCConnectList.set(user, RTConnect);
                console.log("affter set:", JSON.stringify(vm.RTCConnectList.values()[0]));
                vm.rtc
              }).catch(function(reason) {
                console.log(reason);
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
          let RTConnect = new webkitRTCPeerConnection(vm.ice);
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
      //如果是一个ICE的候选，则将其加入到PeerConnection中，否则设定对方的session描述为传递过来的描述
      if( json.event === "_ice_candidate" ){
        console.log("_ice_candidate");
        vm.RTCConnectList.forEach((value, key) => {
          if(key === json.fromUserId){
            value.addIceCandidate(new RTCIceCandidate(json.data.candidate));
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
                navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
              }).then(mediaStream => {
                RTConnect.setLocalDescription(answer);
              })
                RTConnect.setLocalDescription(answer);
                vm.ws.send(JSON.stringify({ // 发送answer
                  "event": "_answer",
                  "toUserId": key,
                  "data": {
                    "sdp": answer
                  }
                }));
              }).then(function (){
                console.log("canTrickleIceCandidates");
                    if (value.canTrickleIceCandidates) {
                      console.log("canTrickleIceCandidates true");
                      return value.localDescription;
                    }
                console.log("canTrickleIceCandidates false");
                    return new Promise(function (r){
                      console.log("addEventListener");
                      value.addEventListener('icegatheringstatechange',function (e){
                        console("iceGatheringState complete");
                        if (e.target.iceGatheringState === 'complete') {
                          r(value.localDescription);
                        }
                      });
                      console.log("addEventListener after");
                    });
                  }).catch(e => function (){
                console.log("error", e);
              });
              value.addEventListener('icecandidate', e => {
                if (value.canTrickleIceCandidates) {
                  vm.ws.send(JSON.stringify({
                    "event": "_ice_candidate",
                    "data": {
                      "candidate": e.candidate
                    }
                  })); // signaling message
                }
              });
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
          console.log()
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
                  value.setLocalDescription(null);
                  console.log(track);
                  value.addTrack(track);
                  console.log(vm.RTCConnectList);
                });
              })
            }
          })
          // vm.RTCConnect.setRemoteDescription(new RTCSessionDescription(json.data.sdp));
        }
      }
    };

    // vm.RTCConnect.setRemoteDescription(new RTCSessionDescription(json.data.sdp));
    //
    // vm.RTCConnect.createAnswer(function(desc){
    //   console.log("创建answer成功");
    //   // 将创建好的answer设置为本地offer
    //   vm.RTCConnect.setLocalDescription(desc);
    //   // 通过socket发送answer
    // }, function(error){
    //   // 创建answer失败
    //   console.log("创建answer失败");
    // })

    // vm.RTCConnect.addIceCandidate(new RTCIceCandidate(json.data.candidate));
    //
    // vm.RTCConnect.onaddstream = function(event){
    //   console.log("检测到媒体流连接到本地");
    //   // 绑定远程媒体流到video标签用于输出
    //   document.getElementById('remoteVideo').src = URL.createObjectURL(event.stream);
    // };

    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(mediaStream => {
      // vm._localStream = mediaStream;
      console.log("mediaStream:" + mediaStream);
      var video1 = document.querySelector("#webcam");
      console.log("video1:" + video1);
      video1.width = 200;
      video1.height = 200;
      video1.srcObject =  mediaStream;
      video1.play();

      // mediaStream.getTracks().forEach(track => {
      //   console.log(track);
      //   vm.RTCConnectList.forEach(value => )
      //   vm.RTCConnect.addTrack(track, mediaStream);
      // })
      // // vm.RTCConnect.addTrack(mediaStream.getVideoTracks()[0], mediaStream);
      // vm.RTCConnect.createOffer(function(desc){
      //   vm.sendOfferFn(desc);
      //   console.log("创建offer成功");
      //   // 将创建好的offer设置为本地offer
      //
      //   // 通过socket发送offer
      // }, function(error){
      //   // 创建offer失败
      //   console.log("创建offer失败");
      // })
      // vm.RTCConnect.onicecandidate = function (event){
      //   if (event.candidate !== null) {
      //     vm.ws.send(JSON.stringify({
      //       "event": "_ice_candidate",
      //       "data": {
      //         "candidate": event.candidate
      //       }
      //     }));
      //   }
      // }
    });
















    this.$nextTick(constraints => {






          // navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
          // var constraints = {audio: false, video: true};
          // var video = document.querySelector("video");
          // navigator.getUserMedia(constraints, this.successCallback, this.errorCallback);
        })

    // vm._localStream.getTracks().forEach(track => {
    //   vm.RTCConnect.addTrack(track);
    // })
    // vm.RTCConnect.createOffer();



    // 只获取video:


  },
  watch:{
    // RTCConnectList:{
    //   handler(val, oldVal){
    //     let vm = this;
    //     vm._localStream.getTracks().forEach(track => {
    //       console.log(track);
    //       val.forEach((value, key) => {
    //         value.addTrack(track, vm._localStream);
    //         value.createOffer(function(desc){
    //           // 设置本地Offer
    //
    //           value.setLocalDescription(desc);
    //           // 发送offer
    //           this.ws.send(JSON.stringify({
    //             "event": "_offer",
    //             "data": {
    //               "sdp": desc
    //             }
    //           }));
    //           console.log("创建offer成功");
    //         }, function(error){
    //           // 创建offer失败
    //           console.log("创建offer失败");
    //         });
    //         value.onicecandidate = function (event){
    //           if (event.candidate !== null) {
    //             vm.ws.send(JSON.stringify({
    //               "event": "_ice_candidate",
    //               "data": {
    //                 "candidate": event.candidate
    //               }
    //             }));
    //           }
    //         }
    //       })
    //     })
    //     // vm.RTCConnect.addTrack(mediaStream.getVideoTracks()[0], mediaStream);
    //     // vm.RTCConnect.createOffer(function(desc){
    //     //   vm.sendOfferFn(desc);
    //     //   console.log("创建offer成功");
    //     //   // 将创建好的offer设置为本地offer
    //     //
    //     //   // 通过socket发送offer
    //     // }, function(error){
    //     //   // 创建offer失败
    //     //   console.log("创建offer失败");
    //     // })
    //     // vm.RTCConnect.onicecandidate = function (event){
    //     //   if (event.candidate !== null) {
    //     //     vm.ws.send(JSON.stringify({
    //     //       "event": "_ice_candidate",
    //     //       "data": {
    //     //         "candidate": event.candidate
    //     //       }
    //     //     }));
    //     //   }
    //     // }
    //   },
    //   deep:true
    // }
  }
}
</script>

<style scoped>

</style>