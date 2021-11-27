<template>
  <div style="margin-top: 50px;width: 60%;margin-left: 20%">
    <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="100">
      <FormItem label="直播间标题" prop="title">
        <Input type="text" v-model="formCustom.title"></Input>
      </FormItem>
      <FormItem label="直播内容" prop="content">
        <Input type="text" v-model="formCustom.content"></Input>
      </FormItem>
      <FormItem label="Age" prop="age">
        <Input type="text" v-model="formCustom.age" number></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formCustom')">Submit</Button>
        <Button @click="handleReset('formCustom')" style="margin-left: 8px">Reset</Button>
      </FormItem>
    </Form>
  </div>

</template>
<script>
export default {
  name:"CreateLive",
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入直播间标题'));
      } else {
        // if (this.formCustom.content !== '') {
        //   // 对第二个密码框单独验证
        //   this.$refs.formCustom.validateField('content');
        // }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入直播间内容介绍'));
      }
      // else if (value !== this.formCustom.title) {
      //   callback(new Error('The two input passwords do not match!'));
      // }
      else {
        callback();
      }
    };
    const validateAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入直播间年龄设置'));
      }
      // 模拟异步验证效果
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字'));
        } else {
          if (value > 150 || value < 15) {
            callback(new Error('年龄在15-150岁之间'));
          } else {
            callback();
          }
        }
      }, 1000);
    };

    return {
      formCustom: {
        title: '',
        content: '',
        age: ''
      },
      ruleCustom: {
        title: [
          { validator: validatePass, trigger: 'blur' }
        ],
        content: [
          { validator: validatePassCheck, trigger: 'blur' }
        ],
        age: [
          { validator: validateAge, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.axios.post("/videoServer/live/create", {
        title:this.formCustom.title,
        // userId:this.$store.getters.getUserId
        userId:1
      }, {
      }).then(res => {
        this.$Message.success('Success!');
      }).catch(error => {
        this.$Message.error(error.toString());
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    }
  }
}
</script>
<style>

</style>
