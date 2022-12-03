const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      //配置跨域
      '/api': {
        target: 'http://113.54.246.254:8080', //这里填写项目真实的后台接口地址
        changOrigin: true, //设置允许跨域
        pathRewrite: {//这个重写不可省略！因为我们真正请求的地址并不含 /api
          '^/api': ''
            /* 当我们在浏览器中看到请求的地址为：http://localhost:8080/api/data/getdata 时
            因为重写了 /api ，所以实际上访问的地址是：http://x.x.x.x:x/data/getdata，
            */
        }
      }
    }
  }
})
