<template>
  <div>
    <div class="input-table">
      <Input v-model="title" placeholder="Enter something..." clearable style="width: 200px" />
    </div>
    <div class="upload-video">
      <Upload
          ref="upload"
          :show-upload-list="false"
          :format="['jpg','jpeg','png']"
          :max-size="2048"
          type="drag"
          :action="imgAction"
          :on-success="uploadImgSuccess"
          style="display: inline-block;width:58px;">
        <div style="width: 58px;height:58px;line-height: 58px;">
          <Icon type="ios-camera" size="20" v-if="visible"></Icon>
          <img src="../assets/logo.png" v-else style="width: 100%">
        </div>
      </Upload>
<!--      <Modal title="View Image" v-model="visible">-->
<!--        <img src="../assets/logo.png" v-if="visible" style="width: 100%">-->
<!--      </Modal>-->
    </div>
    <div class="upload-video">
      <Upload :action="this.action" accept="video/*" :disabled="!this.showUpload">
        <Button icon="ios-cloud-upload-outline">Upload files</Button>
      </Upload>
    </div>
  </div>


</template>

<script>
import env from "../config/env"

export default {
  name: "VideoUpload",
  data(){
    return{
      action:'',
      imgAction:'',
      title: '',
      userId: this.$store.getters.getUserId,
      showUpload: false,
      visible: true
    }
  },
  mounted() {

  },
  methods:{
    createAction(){
      this.action = env.target + "/videoServer/video/create?title=" + this.title + "&userId=" + this.userId;
      this.imgAction = env.target + "/videoServer/video/uploadImage?userId=" + this.userId;
    },
    uploadImgSuccess(res, file){
      console.log("res", res);
      console.log("file", file);
      this.visible = false;
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