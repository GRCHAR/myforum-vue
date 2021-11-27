<template>
  <div id="app">
    <div class="layout">
      <Layout :style="{minHeight: '100vh'}">

        <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
          <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
            <MenuItem name="1-1" to="/tie">
              <Icon type="ios-navigate"></Icon>
              <span>论坛</span>
            </MenuItem>
            <MenuItem name="1-2" to="/register">
              <Icon type="search"></Icon>
              <span>注册</span>
            </MenuItem>
            <MenuItem name="1-3" o="/login">
              <Icon type="settings"></Icon>
              <span>登录</span>
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
          </Menu>
        </Sider>
        <Layout>
          <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
            <Button style="margin-left: 80%" type="text" to="/login">登录</Button>
          </Header>
          <Content :style="{padding: '0 16px 16px'}">
<!--            <Breadcrumb :style="{margin: '16px 0'}">-->
<!--              <BreadcrumbItem>Tie</BreadcrumbItem>-->
<!--              <BreadcrumbItem>Register</BreadcrumbItem>-->
<!--              <BreadcrumbItem>Login</BreadcrumbItem>-->
<!--              <BreadcrumbItem>upload</BreadcrumbItem>-->
<!--              <BreadcrumbItem>list</BreadcrumbItem>-->
<!--            </Breadcrumb>-->
            <router-view/>
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
      isCollapsed: false
    };
  },
  computed: {
    menuitemClasses: function () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  }
}
</script>

