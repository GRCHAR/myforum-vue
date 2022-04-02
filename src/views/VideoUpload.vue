<template>
  <div>
    <div class="input-table">
      <Input v-model="title" placeholder="Enter something..." clearable style="width: 200px" />
    </div>
     <Upload 
        :before-upload="handleImageUpload" v-if="!this.imageUploaded">
        <Button icon="ios-cloud-upload-outline">选择图片</Button>
    </Upload>
    <img v-else :src="this.imageFilePath" width="300px">
    <Upload :action="this.action">
        <Button icon="ios-cloud-upload-outline">选择视频</Button>
    </Upload>
    <!-- <Progress :percent="this.videoFile.percentage" hide-info></Progress> -->
    <Button @click="uploadImg">上传</Button>

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
      loadingStatus: false
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
      var forms = new FormData()
      forms.append('file', this.imageFile)
      this.axios.post(
         "/videoserver/video/uploadImage?userId=" + this.userId + "&Authorization=" + this.token, 
        forms,
        {headers:{'Content-Type':'multipart/form-data'}}
      ).then((result) => {
        if(result.data.code == 0) {
          this.$Message.success("上传成功")
        }
      }).catch((err) => {
        this.$Message.success("上传失败")
      });
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
          this.$Message.success("上传成功")
        }
      }).catch((err) => {
        this.$Message.success("上传失败")
      });
    },
    handlerProgress(event, file, fileList){
      console.log(fileList)
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
</style>