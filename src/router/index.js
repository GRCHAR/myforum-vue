import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Tie from '../views/Tie.vue'
import Register from '../views/Register'
import Login from '../views/Login'
import Live from '../views/Live.vue'
import WebRTC from "@/components/WebRTC";
import remote from "@/components/remote";
import iframe from "@/views/iframe"
import createTie from "@/views/CreateTie"
import Video from "@/views/Video"
import VideoUpload from "@/views/VideoUpload";
import VideoList from "@/views/VideoList";
import CreateLive from "@/views/CreateLive";
import LiveList from "@/views/LiveList";


import ViewUI from 'view-design';
Vue.use(ViewUI);


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about/',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/tie',
    name: 'Tie',
    component: Tie
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/live',
    name: 'Live',
    component: Live
  },
  {
    path: '/webrtc',
    name: 'WEBRTC',
    component: WebRTC
  },
  {
    path: '/remote',
    name: 'remote',
    component: remote
  },
  {
    path: '/iframe',
    name: 'iframe',
    component: iframe
  },
  {
    path: '/createTie',
    name: 'CreateTie',
    component: createTie
  },
  {
    path: '/video',
    name: 'Video',
    component: Video
  },
  {
    path: '/upload',
    name: 'VideoUpload',
    component: VideoUpload
  },
  {
    path: '/videoList',
    name: 'VideoList',
    component: VideoList
  },
  {
    path: '/createLive',
    name: 'CreateLive',
    component: CreateLive
  },
  {
    path: '/liveList',
    name: 'LiveList',
    component: LiveList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

ViewUI.LoadingBar.config({
  // color: '#5cb85c',
  // failedColor: '#f0ad4e',
  // height: 3
})  

router.beforeEach((to, from, next) => {
  ViewUI.LoadingBar.start();
  next();
});

router.afterEach(route => {
  ViewUI.LoadingBar.finish();
});


export default router
