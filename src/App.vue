<template>
  <div id="app">
    <keep-alive exclude="article">
      <router-view />
    </keep-alive>
  </div>
</template>

<style lang="less">
@import url("./iconfont/iconfont.css");
@import url("./iconfont/iconfont_add.css");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body,
#app {
  width: 100%;
  height: 100vh;
}
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 0;
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  cursor: pointer;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.15);
  transition: color 0.2s ease;
}

</style>
<script>
export default {};
</script>
