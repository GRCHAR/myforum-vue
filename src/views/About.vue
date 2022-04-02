<template>
    <div class="layout">
      <Layout>
        <Header>
          <Menu mode="horizontal" theme="light" active-name="1">
            <div class="layout-logo"></div>
            <div class="layout-nav">
              <MenuItem name="1">
                <Icon type="ios-navigate"></Icon>Item 1
              </MenuItem>
              <MenuItem name="2">
                <Icon type="ios-keypad"></Icon>Item 2
              </MenuItem>
              <MenuItem name="3">
                <Icon type="ios-analytics"></Icon>Item 3
              </MenuItem>
              <MenuItem name="4"> <Icon type="ios-paper"></Icon>Item 4 </MenuItem>
            </div>
          </Menu>
        </Header>
        <Content :style="{ padding: '10px 10px' }">
          <div class="about">
            <Card v-for="(comment, item) in comments" :key="item">
              <div>
                <Row>
                  <Col span="2">
                    <Card class="cardUser" :bordered="false" dis-hover>
                      <div class="User">{{ comments[item].userId }}</div>
                    </Card>
                  </Col>
                  <Col span="16">
                    <Card class="cardContent" :bordered="false" dis-hover>
                      <div class="content">{{ comments[item].content }}</div>
                    </Card>
                    <!--                  <Card class="cardContentComment">-->
                    <!--                    <div class="content">test cs comment</div>-->
                    <!--                  </Card>-->
                  </Col>
                  <Col span="4">
                    <Card class="cardTime" :bordered="false" dis-hover>
                      <div class="content">{{ comments[item].createTime }}</div>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Card>
          </div>
        </Content>
        <Footer class="layout-footer-center">
          <Row>
            <Col span="23">
              <Input
                  v-model="commitcomment"
                  type="textarea"
                  placeholder="Enter something..."
              />
            </Col>
            <Col span="1">
              <Button style="height: 50px; width: 55px" @click="commitComment"
              >提交</Button
              >
            </Col>
          </Row>
        </Footer>
      </Layout>
    </div>
</template>


<script>
export default {
  name: "About",
  data() {
    return {
      tieId: 0,
      comments: null,
      userList: null,
      commitcomment: null,
      pageIndex: 0,
      pageSize: 100
    };
  },
  created() {

  },
  mounted(){
    var vm = this;

    // this.tieId = this.$route.query.TieId;
    console.log(this.$route.query);
    console.log(this.$route.query.TieId);
    this.tieId = this.$route.query.TieId;
    console.log(this.tieId);
    this.axios
        .post("/tie/getCommentsByMongo", {
          tieId: this.$route.query.TieId
        }, { headers: { "Content-Type": "application/json" } })
        .then((response) => {

          console.log(vm.tieId);
          console.log(response.data.data);
          vm.comments = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
  },
  watch: {
    // comments:{
    //   handler(){

    //   },
    //   deep: true
    // }
//     comments(oldValue, newValue){
//       　for (let i = 0; i < newValue.length; i++) {
// 　　　　　　　　if (oldValue[i] != newValue[i]) {
// 　　　　　　　　　　console.log(newValue)
// 　　　　　　　　}
// 　　　　　　}
//     }
  },
  methods: {
    getCookie: function(cookieName) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for(var i = 0; i < arrCookie.length; i++){
        var arr = arrCookie[i].split("=");
        if(cookieName == arr[0]){
            return arr[1];
            }
        }
    return "";
    },
    getUser: function (userId) {
      var vm = this;
      this.axios
        .get("/user/getUser", {
          params: {
            userId: userId,
            token: this.$store.getters.getToken
          },
        })
        .then(function (response) {
          this.userList = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    commitComment: function () {
      let vm = this;
      this.axios
        .post(
          "/forum/tie/createCommentByMongo",
          {
            userId: this.getCookie("userId"),
            tieId: this.tieId,
            content: vm.commitcomment,
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
  },
};
</script>

<style scoped>
.row {
  display: inline-block;
}

.User {
  margin-right: 0.2%;
  position: relative;
  height: 100%;
  width: 100%;
  word-wrap: break-word;
  text-align: left;
  margin-left: auto;
  margin-right: auto;
}

.content {
  position: relative;
  width: 100%;
  height: 100%;
  word-wrap: break-word;
  text-align: left;
  margin-left: auto;
  margin-right: auto;
}

.action {
  background-color: bisque;
  position: relative;
  width: 9.5%;
  min-height: 50px;
  margin-left: auto;
  margin-right: auto;
}

.User2 {
  margin-right: 0.2%;
  position: relative;
  height: auto;
  width: 100%;
  word-wrap: break-word;
  text-align: left;
  margin-left: auto;
  margin-right: auto;
}

.content2 {
  background-color: antiquewhite;
  position: relative;
  width: 60%;
  min-height: 50px;
}

.action2 {
  background-color: antiquewhite;
  position: relative;
  width: 9.5%;
  min-height: 50px;
}

.content.content_in {
  position: absolute;
  padding: 2px;
  width: 60%;
  min-height: 50px;
  height: auto;
}

.cardUser {
  width: 99%;
  height: fit-content;
}
.cardContent {
  width: 99%;
  height: fit-content;
}
.cardTime {
  width: 99%;
  height: fit-content;
}
.cardContentComment {
  width: 890px;
  height: fit-content;
  left: 10px;
}

.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.layout-footer-center {
  display: inline-block;
  width: 100%;
  text-align: center;
}
</style>