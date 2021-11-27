<template>
  <div>
    <div>
      <Row>
        <Input class="search-video" search enter-button v-model="searchName" placeholder="Enter something..." @on-search="searchVideos"	/>
      </Row>
    </div>
    <br>
    <div v-for="rowCount in 4">
      <Row>
        <Col class="video_row" span="5" offset="2" v-for="(item, key) in videoList.slice(((rowCount - 1) * 3), (rowCount)*3)">
          <Card v-if="item != null" replace :to="{ name: 'Video', params: { videoId: item.id}}" append>
            <img :src="getImage(item.id)" width="120px" height="90px" />
            <p>{{item.title}}</p>
          </Card>
        </Col>
      </Row>
    </div>
    <Page class="video-page" show-elevator :page-size="this.pageSize" :total="this.pageTotal" :current="this.changePageNumber(pageNumber)" @on-change="changePageNumber"/>
  </div>
</template>

<script>
import videoAxios from "@/axios";
import env from "@/config/env"; videoAxios()
export default {
  name: "LiveList",
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
    getImage(videoId){
      return env.target + "/videoServer/video/getImage?imageId=2&videoId=" + videoId;
    },
    getVideo(){
      this.axios.get("/videoServer/video/getVideoPage" , {
        params: {
          pageNumber: this.pageNumber,
          searchName: this.searchName
        }
      }).then(res => {
        this.videoList = res.data.data;
      })
    },
    getTotal(){
      this.axios.get("/videoServer/video/getVideoTotal", {
        params:{
          searchName: this.searchName
        }
      }).then(res => {
        this.pageTotal = res.data.data;
      })
    },
    searchVideos(){
      console.log("searchName:", this.searchName);
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
</style>