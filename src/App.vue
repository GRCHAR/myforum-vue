<template>
  <div id="app" v-title data-title="标题">
    <div class="layout">
      <Layout :style="{minHeight: '100vh'}">
<!--        <div :class="this.isFixed === true ? 'isFixed' : ''">-->
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto', background: 'white'}">
          <Menu active-name="1-2" theme="light" width="auto" :class="menuitemClasses">
            <MenuItem name="1-1" to="/tie">
              <Icon type="ios-navigate"></Icon>
              <span>论坛</span>
            </MenuItem>
            <MenuItem name="1-4" to="/upload">
              <Icon type="settings"></Icon>
              <span>上传视频</span>
            </MenuItem>
            <MenuItem name="1-5" to="/videoList">
              <Icon type="settings"></Icon>
              <span>视频列表</span>
            </MenuItem>
            <MenuItem name="1-6" to="/video">
              <Icon type="settings"></Icon>
              <span>直播</span>
            </MenuItem>
            <MenuItem name="1-7" to="/video">
              <Icon type="settings"></Icon>
              <span>直播列表</span>
            </MenuItem>
          </Menu>
        </Sider>
<!--        </div>-->
        <Layout :style="{marginLeft: '200px'}">
          <Header  :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
            <span>
              <Button  style="margin-left: 80%" type="text" to="/login">登录</Button>
            </span>
            <span>
              <Button style="margin-left: 10px" type="text" to="/register">注册</Button>
            </span>

          </Header>
          <Content :style="{padding: '0 16px 16px'}">
<!--            <Breadcrumb :style="{margin: '16px 0'}">-->
<!--              <BreadcrumbItem>Tie</BreadcrumbItem>-->
<!--              <BreadcrumbItem>Register</BreadcrumbItem>-->
<!--              <BreadcrumbItem>Login</BreadcrumbItem>-->
<!--              <BreadcrumbItem>upload</BreadcrumbItem>-->
<!--              <BreadcrumbItem>list</BreadcrumbItem>-->
<!--            </Breadcrumb>-->
            <router-view style="margin-top: 30px"/>
          </Content>
        </Layout>
      </Layout>
    </div>
<!--    <div id="nav">-->
<!--      <router-link to="/">Home</router-link> |-->
<!--      <router-link to="/about">About</router-link> |-->
<!--      <router-link to="/tie">Tie</router-link> |-->
<!--      <router-link to="/register">Register</router-link> |-->
<!--      <router-link to="/login">Login</router-link> |-->
<!--      <router-link to="/live">Live</router-link> |-->
<!--      <router-link to="/webrtc">WEBRTC</router-link> |-->
<!--      <router-link to="/remote">remote</router-link> |-->
<!--&lt;!&ndash;      <router-link to="/iframe">iframe</router-link> |&ndash;&gt;-->
<!--      <router-link to="/video">video</router-link> |-->
<!--      <router-link to="/upload">upload</router-link> |-->
<!--      <router-link to="/videoList">list</router-link>-->
<!--    </div>-->

  </div>
</template>

<style lang="scss">
.layout{
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar{
  background: #fff;
  box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.layout-con{
  height: 100%;
  width: 100%;
}
.menu-item span{
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width .2s ease .2s;
}
.menu-item i{
  transform: translateX(0px);
  transition: font-size .2s ease, transform .2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span{
  width: 0px;
  transition: width .2s ease;
}
.collapsed-menu i{
  transform: translateX(5px);
  transition: font-size .2s ease .2s, transform .2s ease .2s;
  vertical-align: middle;
  font-size: 22px;
}

.isFixed{
  position: fixed;
  top: 0px;
  z-index: 4;
  width: 100%;
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>


<script>
export default {
  data () {
    return {
      isCollapsed: false,
      isFixed: false,
    };
  },
  mounted() {
    // window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods:{
    handleScroll () {
      this.$nextTick(() => {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let headerTop = document.getElementById("header");
        console.log(scrollTop+'------------')
        if (scrollTop > 10) {
          this.isFixed = true;
        } else {
          this.isFixed = false;
        }
      })
    },
  },
  computed: {
    menuitemClasses: function () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : '',
        this.isFixed ? 'isFixed' : ''

      ]
    }
  }
}
</script>

