<template>
  <div>
    <div class="input-table">
      标题:<Input v-model="title" placeholder="Enter something..." clearable style="width: 200px" />
    </div>
    <div class="upload-image">
      <Upload 
        :before-upload="handleImageUpload" v-if="!this.imageUploaded">
        封面:<Button icon="ios-cloud-upload-outline">选择图片</Button>
    </Upload>
    <img v-else :src="this.imageFilePath" width="300px">
    </div>
    <div>
      <Upload :action="this.action">
        视频:<Button icon="ios-cloud-upload-outline">选择视频</Button>
      </Upload>
    </div>
    <div>
      分类:
    </div>
    <div>
      标签:
    </div>
    <div>
      简介:
    </div>
    
    
    <!-- <Progress :percent="this.videoFile.percentage" hide-info></Progress> -->
    <Button @click="uploadImg">上传</Button>
     <el-upload
  class="upload-demo"
  ref="upload"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  :auto-upload="false">
  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>

  </div>


 


</template>

<script>
import env from "../config/env"
import LoginVue from './Login.vue';

export default {
  name: "VideoUpload",
  data(){
    return{
      action:'',
      imgAction:'',
      title: '',
      userId: this.$store.getters.getUserId,
      token: this.$store.getters.getToken,
      showUpload: false,
      visible: true,
      imageFile: null,
      imageFilePath: null,
      videoFile: null,
      imageUploaded: false,
      videoUploaded: false,
      loadingStatus: false,
      videoId:'',
      fileList:[]
    }
  },
  mounted() {
    if(this.token === null && (localStorage.getItem("u_id") === null || localStorage.getItem("u_tk") === null)) {
      this.$Message.error("上传视频请先登录！");
      this.$router.push({path:"/Login"})
    }
    if (localStorage.getItem("u_id") != null && localStorage.getItem("u_tk")) {
      this.$store.commit("setUserId", localStorage.getItem("u_id"))
      this.$store.commit("setToken", localStorage.getItem("u_tk"))
    }
    this.createAction()
  },
  methods:{
    createAction(){

      this.action = env.target + "/videoserver/video/upload?title=" + this.title + "&userId=" + this.userId + "&Authorization=" + this.token;
      this.imgAction = env.target + "/videoserver/video/uploadImage?userId=" + this.userId;
    },
    uploadImgSuccess(res, file){
      console.log("res", res);
      console.log("file", file);
      this.visible = false;
    },
    handleImageUpload (file) {
      this.imageFile = file;
      console.log("file",window.URL.createObjectURL(this.imageFile))
      this.imageFilePath = window.URL.createObjectURL(this.imageFile)
      this.imageUploaded = true;
      return false;
    },
     handleVideoUpload (file) {
      this.videoFile = file;
      this.videoUploaded = true;
      return false;
    },
    uploadImg(){
      if(this.videoId != '') {
        var forms = new FormData()
      forms.append('file', this.imageFile)
      this.axios.post(
         "/videoserver/video/uploadImage?videoId=" + this.videoId + "&Authorization=" + this.token, 
        forms,
        {headers:{'Content-Type':'multipart/form-data'}}
      ).then((result) => {
        if(result.data.code == 0) {
          this.$Message.success("上传成功")
        }
      }).catch((err) => {
        this.$Message.error("上传失败")
      });
      } else {
        this.$Message.error("视频未上传完成")
      }
      
    },
    uploadVideo(){
      var forms = new FormData()
      forms.append('file', this.videoFile)
      this.axios.post(
        "/videoserver/video/upload?userId=" + this.userId + "&Authorization=" + this.token, 
        forms,
        {headers:{'Content-Type':'multipart/form-data'}}
      ).then((result) => {
        if(result.data.code == 0) {
          this.videoId = result.data.videoId
          this.$Message.success("上传成功")
        }
      }).catch((err) => {
        this.$Message.error("上传失败")
      });
    },
    handlerProgress(event, file, fileList){
      console.log(fileList)
    },
    submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    
  },
  watch:{
    "title":function (newv, oldv){
      this.showUpload = newv !== null;
      this.createAction();
    }
  }
}
</script>

<style scoped>
.input-table {
  margin-top: 50px;
}
.upload-video {
  margin-top: 50px;
}
.upload-image {
  margin-top: 30px;
}
</style>