<template>
  <div class="hello">
    <iframe id="urlIframe" src="http://localhost:8081/" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%"
            scrolling="no" onload="reinitIframe()" frameborder="0" marginheight="0" marginwidth="0"></iframe>
  </div>
</template>

<script>
function reinitIframe() {
  console.log("test");
  var iframe = document.getElementById("urlIframe");
  console.log("test2");
  try
  {
    var bHeight = iframe.contentWindow.document.body.scrollHeight;
    console.log("bheight", bHeight);
    iframe.height = bHeight;
  } catch (ex) {
    console.log(ex);
  }
}
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
