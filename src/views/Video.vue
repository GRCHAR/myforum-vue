<template>
<div>
  <div class="title">
    {{this.title}}
  </div>
  <video id="videoPlayer" controls auto></video>
  <div class="slider">
    <Slider v-model="value1"></Slider>
  </div>
  <div class="content">
    <Collapse simple>
        <Panel name="1">
            史蒂夫·乔布斯
            <p slot="content">史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>
        </Panel>
    </Collapse>
  </div>
  <div class="conmmentInput">
    <Input v-model="value8" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..." />
  </div>
  
  <div class="commentButton">
    <Button size="large">发表评论</Button>
  </div>
  <div>
    <List item-layout="vertical">
        <ListItem v-for="item in data" :key="item.title">
            <ListItemMeta :avatar="item.avatar" :title="item.title" :description="item.description" />
            {{ item.content }}
            <template slot="action">
                <li>
                    <Icon type="ios-star-outline" /> 123
                </li>
                <li>
                    <Icon type="ios-thumbs-up-outline" /> 234
                </li>
                <li>
                    <Icon type="ios-chatbubbles-outline" /> 345
                </li>
            </template>
        </ListItem>
    </List>
  </div>
</div>
  
</template>


<script src="../js/dash.js"></script>
<script>
import dashjs from "../js/dash"
import env from "../config/env"

export default {
  name: "Video.vue",
  data() {
    return {
      title: "",
      userName: this.$route.params.userNmae,
      data:[
        {
          title:"",
          description:"",
          avatar:"",
          content:""
        }
      ]
    }
  },
  
  mounted() {
    
    var url = env.target + "/videoserver/video/getDash/"+ this.$route.query.videoId + "/mpd";
    // var url = "http://192.168.56.124:8071/dash/test1.mpd"
    var player = dashjs.MediaPlayer().create();
    player.initialize(document.querySelector("#videoPlayer"), url, true);
    this.increasePlayCount()
    this.getVideoInfo()
  },
  methods:{
    increasePlayCount() {
      this.axios.get("/videoserver/video/videoCount", {params:{videoId:this.$route.query.videoId}})
    },
    getVideoInfo(){
      this.axios.get("/videoserver/video/getMeta", {params:{videoId:this.$route.query.videoId}}).then((result) => {
        this.title = result.data.video.Title
      }).catch((err) => {
        
      });
    }
  },
}
</script>

<style scoped>

video {
  width: 640px;
  height: 360px;
}
.title {
  font-size: 20px;

}
.conmmentInput{
  width: 80%;
  margin-top: 50px;
  /* margin-left: 10%; */
  display:inline-block;
}
.commentButton {
  display:inline-block;
  margin-left: 5px;
  /* height: 50px; */
}

.slider {
  width: 640px;
}

.content {
  width: 640px;
}

</style>