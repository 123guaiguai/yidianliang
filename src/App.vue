<template>
  <div id="app">
    <keep-alive>
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
</style>
