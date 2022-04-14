<template>
  <div>
    <div>
      <Row>
        <Input class="search-video" search enter-button v-model="searchName" placeholder="Enter something..." @on-search="searchVideos"	/>
      </Row>
    </div>
    <br>
    <div v-for="rowCount in 4" :key=rowCount>
      <Row>
        <Col class="video_row" span="5" offset="1" v-for="(item, key) in videoList.slice(((rowCount - 1) * 4), (rowCount)*4)" :key=key>
          <Card v-if="item != null" replace :to="{ name: 'Video', query: { videoId: item.Id}}" append>
            <img :src="getImage(item.Id,item.Image)" width="200px" height="150px"/>
            <div class="title">{{item.Title}}</div>
            <div class="up">
              <p>up:{{item.UserName}} 播放量:{{item.PlayCount}}</p>
            
            </div>
            
          </Card>
        </Col>
      </Row>
    </div>
    <Page class="video-page" show-elevator :page-size="this.pageSize" :total="this.pageTotal" :current="this.changePageNumber(pageNumber)" @on-change="changePageNumber"/>
  </div>
</template>

<script>
import videoAxios from "@/axios";
import env from "@/config/env";
 videoAxios()
export default {
  name: "VideoList",
  data() {
    return {
      videoList:[],
      pageNumber: 1,
      pageSize: 12,
      pageTotal: 4,
      searchName: ''
    }
  },
  created() {
  },
  mounted() {
    this.getTotal();
    this.getVideo();
  },
  methods:{
    async getUser(userId){
      let name = ""

      await this.axios.get("/videoserver/user/UserInfo", {
        params:{
          userId: 1
        }
      }).then(res => {
        name = res.data.name
        console.log(name)
      })
      return Promise.resolve(name)
    },
    getUserName(userId) {
      this.getUser(userId).then(name => {
        return name
      })
    },
    getImage(videoId, imageStatus){
      if(imageStatus == 1) {
        return env.target + "/videoserver/video/getImage?imageId=0&videoId=" + videoId;
      } 
      return env.target + "/videoserver/video/getImage?imageId=2&videoId=" + videoId;
    },
    getVideo(){
      this.axios.get("/videoserver/video/getVideoPage" , {
        params: {
          number: this.pageNumber,
          keyword: this.searchName,
          size: this.pageSize
        }
      }).then(res => {
        this.videoList = res.data.videos;
      }).catch(err =>{
        this.$Message.error("获取视频列表错误!");
      } )
    },
    getTotal(){
      this.axios.get("/videoserver/video/getVideoTotal", {
        params:{
          keyword: this.searchName
        }
      }).then(res => {
        this.pageTotal = res.data.count;
      })
    },
    searchVideos(){
      this.getTotal();
      this.getVideo();
    },
    changePageNumber(pageNumber){
      this.pageNumber = pageNumber;
      return pageNumber;
    }
  },
  watch:{
     pageNumber(){
       this.getVideo();
    }
  }

}
</script>

<style scoped>
.video_row{
  margin-top: 50px;
}
.search-video {
  width: 50%;
  margin-left: 25%;
}
.video-page {
  margin-top: 50px;
}
.title {
  font-size: 20px;
  color: black;
}
.up {
  font-size: 12px;
  color: gray
}
</style>