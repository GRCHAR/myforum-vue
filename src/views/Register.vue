<template>
  <div class="mybody">
    <Form
      ref="formInline"
      :model="formItem"
      :label-width="100"
      style="
        width: 50%;
        height: 50%;
        position: relative;
        margin: 0 auto;
        margin-top: 13%;
      "
    >
      <FormItem prop="user" label="用户名:" style="margin-bottom: 50px">
        <Input type="text" v-model="formInline.user" placeholder="Username">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password" label="密码:">
        <Input
          type="password"
          v-model="formInline.password"
          placeholder="Password"
        >
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit()">Signin</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        password: "",
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Please fill in the password.",
            trigger: "blur",
          },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleSubmit() {
      let vm = this;
      this.axios
        .post(
          "/forum/user/register",
          {
            name: vm.formInline.user,
            password: vm.formInline.password,
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((Response) => {
          vm.$router.push({
            name: "Tie",
            params: {
              userId: Response.data.data,
            },
          });
        });
    },
  },
};
</script>
<style scoped>
mybody {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>