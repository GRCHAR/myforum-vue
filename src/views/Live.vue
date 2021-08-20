<template>
    <div class="video_con">
        <video controls class="video" ref="video"></video>
    </div>
</template>

<script>
　　 // npm install hls.js -S
    let Hls = require('hls.js');
    export default {
        data() {
          return {
              hls: null,
              liveStreamKey: null

          }
        },
        created(){

        },
        mounted() {
            this.getStream('http://47.93.125.10:8077/hls/'+ this.liveStreamKey +'.m3u8')
        },
        methods: {
            getStream(source) {
                if (Hls.isSupported()) {
                    this.hls = new Hls();
                    this.hls.loadSource(source);
                    this.hls.attachMedia(this.$refs.video);

                    this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
                        console.log("加载成功");
                        this.$refs.video.play();
                    });
                    this.hls.on(Hls.Events.ERROR, (event, data) => {
                        // console.log(event, data);
                        // 监听出错事件
                        console.log("加载失败");
                    });
                } else if (this.$refs.video.canPlayType('application/vnd.apple.mpegurl')) {
                    this.$refs.video.src = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';
                    this.$refs.video.addEventListener('loadedmetadata',function() {
                        this.$refs.video.play();
                    });
                }
            },
            // 停止流
            videoPause() {
                if (this.hls) {
                    this.$refs.video.pause();
                    this.hls.destroy();
                    this.hls = null;
                }
            },

            getStreamKey(){
                let vm = this;

            }
        }
    }
</script>