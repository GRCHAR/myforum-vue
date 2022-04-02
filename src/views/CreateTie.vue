<template>
  <div class="createForm">
  <Form :model="formItem" :label-width="80">
    <Form-item label="输入框">
      <Input v-model="formItem.input" placeholder="请输入"></Input>
    </Form-item>
    <Form-item label="选择器">
      <Select v-model="formItem.select" placeholder="请选择">
        <Option value="beijing">北京市</Option>
        <Option value="shanghai">上海市</Option>
        <Option value="shenzhen">深圳市</Option>
      </Select>
    </Form-item>
    <Form-item label="日期控件">
      <Row>
        <Col span="11">
          <Date-picker type="date" placeholder="选择日期" v-model="formItem.date"></Date-picker>
        </Col>
        <Col span="2" style="text-align: center">-</Col>
        <Col span="11">
          <Time-picker type="time" placeholder="选择时间" v-model="formItem.time"></Time-picker>
        </Col>
      </Row>
    </Form-item>
    <Form-item label="单选框">
      <Radio-group v-model="formItem.radio">
        <Radio label="male">男</Radio>
        <Radio label="female">女</Radio>
      </Radio-group>
    </Form-item>
    <Form-item label="多选框">
      <Checkbox-group v-model="formItem.checkbox">
        <Checkbox label="吃饭"></Checkbox>
        <Checkbox label="睡觉"></Checkbox>
        <Checkbox label="跑步"></Checkbox>
        <Checkbox label="看电影"></Checkbox>
      </Checkbox-group>
    </Form-item>
    <Form-item label="开关">
      <Switch v-model="formItem.switch" size="large">
        <span slot="open">开启</span>
        <span slot="close">关闭</span>
      </Switch>
    </Form-item>
    <Form-item label="滑块">
      <Slider v-model="formItem.slider" range></Slider>
    </Form-item>
    <Form-item label="文本域">
      <div class="edit_container">
        <quill-editor
            v-model="formItem.textarea"
            ref="myQuillEditor"
            :options="editorOption"
            >
        </quill-editor>
      </div>
<!--      <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>-->
    </Form-item>
    <Form-item>
      <Button type="primary" @click="submitCreateTie">提交</Button>
      <Button type="ghost" style="margin-left: 8px">取消</Button>
    </Form-item>
  </Form>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import Quill from "quill";
// import ImageResize from "quill-image-resize-module"; // 引用
import { ImageDrop } from "quill-image-drop-module";
Quill.register("modules/imageDrop", ImageDrop);
// Quill.register("modules/imageResize", ImageResize); // 注册
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
  ["blockquote", "code-block"], // 引用  代码块-----['blockquote', 'code-block']
  [{ header: 1 }, { header: 2 }], // 1、2 级标题-----[{ header: 1 }, { header: 2 }]
  [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
  [{ script: "sub" }, { script: "super" }], // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
  [{ indent: "-1" }, { indent: "+1" }], // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
  [{ direction: "rtl" }], // 文本方向-----[{'direction': 'rtl'}]
  [{ size: ["small", false, "large", "huge"] }], // 字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
  [{ font: [] }], // 字体种类-----[{ font: [] }]
  [{ align: [] }], // 对齐方式-----[{ align: [] }]
  ["clean"], // 清除文本格式-----['clean']
  ["image", "video"] // 链接、图片、视频-----['link', 'image', 'video']
];
export default {
  name: "CreateTie",
  components:{
    quillEditor
  },
  data () {
    return {
      editorOption: {
        theme: "snow",
        placeholder: "请输入正文",
        modules: {
          imageDrop: true,
          imageResize: {
            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white"
            },
            modules: ["Resize", "DisplaySize", "Toolbar"]
          },
          //  富文本编辑器配置
          toolbar: {
            container: toolbarOptions
          }
        }
      },
      formItem: {
        input: '',
        select: '',
        radio: 'male',
        checkbox: [],
        switch: true,
        date: '',
        time: '',
        slider: [20, 50],
        textarea: ''
      }
    }
  },
  methods:{
    submitCreateTie(){
      let vm = this;
      vm.axios.post("/forum/tie/create", {
        createTime: new Date().getTime(),
        content: vm.formItem.textarea,
        title: vm.formItem.input
      }, {}).then((res) => {
        if(res.data.code === 200){
          this.$Message.success('创建成功！3s后返回首页');
        } else {
          this.$Message.error('创建失败！' + res.data.message);
        }
        setTimeout(()=>{
          vm.$router.push("Tie");
        }, 3000);

      })
    }
  },
  computed:{
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  }
}
</script>

<style scoped>
.createForm{
  width: 70%;
  margin: 0 auto;
}
</style>