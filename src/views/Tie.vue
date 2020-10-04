<template>
  <div name="tie">
    <Layout>
      <Header>
        <Button @click="createTie">创建帖子</Button>
      </Header>
      <Content>
        <List item-layout="vertical">
          <ListItem v-for="item in Tie" :key="item.title">
            <ListItemMeta
              avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
            />
            <Button @click="clickTie(item.id)" type="text">{{
              item.title
            }}</Button>

            <template slot="action">
              <li><Icon type="ios-star-outline" />123</li>
              <li><Icon type="ios-thumbs-up-outline" />234</li>
              <li><Icon type="ios-chatbubbles-outline" />345</li>
              <li>
                {{ item.createTime }}
              </li>
            </template>
            <template slot="extra">
              <img
                src="https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large"
                style="width: 280px"
              />
            </template>
          </ListItem>
        </List>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  </div>
</template>

<script>
export default {
  name: "Tie",
  data() {
    return {
      tieId: 1,
      Tie: null,
      User: null,
    };
  },
  created() {
    let vm = this;
    this.axios
      .get("/tie/getTies", {})
      .then(function (rep) {
        vm.Tie = rep.data.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  methods: {
    clickTie: function (tieId) {
      console.log(tieId);
      this.$router.push({
        name: "About",
        query:{
          TieId: tieId,
        }
      });
    },
    createTie: function () {
      this.$Modal.confirm({
        render: (h) => {
          return h("Input", {
            props: {
              value: this.value,
              autofocus: true,
              placeholder: "Please enter your name...",
            },
            on: {
              input: (val) => {
                this.value = val;
              },
            },
          });
        },
      });
    },
  },
};
</script>

<style>
</style>