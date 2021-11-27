

<template>
  <div style="height: 3095px">
    <iframe id="urlIframe" src="../components/HelloWorld.vue" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%" scrolling="no"></iframe>
  </div>
</template>

<script>

import $ from 'jquery'

export default {
  name: "iframe.vue",

  mounted() {
    $("#urlIframe").on('load',function () {
      console.log("urlIframe start")
      var mainheight = $(this).contents().find("body").height() + 30;
      console.log("mainheight:",mainheight)
      $(this).height(mainheight);
    });
  }
}
</script>

<style scoped>

</style>