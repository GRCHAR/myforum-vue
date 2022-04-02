<template>
  <div class="edit_container">
    <quill-editor
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
        @change="onEditorChange($event)">
    </quill-editor>
    <Button style="height: 40px; width: 55px" @click="commitComment">提交</Button>
  </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
export default {
  name: "edit",
  components: {
    quillEditor
  },
  data() {
    return {
      content: ``,
      editorOption: {}
    }
  },
  methods: {
    onEditorReady(editor) { // 准备编辑器

    },
    commitComment: function () {
      let vm = this;
      this.axios
          .post(
              "/forum/tie/createCommentByMongo",
              {
                userId: this.$store.getters.getUserId,
                content: vm.content,
              },
              {
                headers: { "Content-Type": "application/json" },
              }
          )
          .then(function (response) {
            vm.$nextTick(() => {
              vm.axios
                  .post("/tie/getCommentsByMongo", {
                    tieId: vm.tieId
                  }, { headers: { "Content-Type": "application/json" } })
                  .then((response) => {

                    vm.comments = response.data.data;
                    vm.commitcomment = "";
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
            })
            // this.comments = response.data.data;
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    onEditorBlur(){}, // 失去焦点事件
    onEditorFocus(){}, // 获得焦点事件
    onEditorChange(){}, // 内容改变事件
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  }
}
</script>