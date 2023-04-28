<template>
  <div class="container">
    <div class="header">
      +选择头像
      <input type="file" class="chooseFile" @change="onChange" />
    </div>
    <div class="tip">建议尺寸:1MB以内</div>
    <img :src="avatarPic" alt="" onerror="faultImg" />
    <div class="save" @click="save">保存</div>
  </div>
</template>

<script>
import { uploadAvatar } from "../../request/api/person.js";
import { mapMutations, mapState } from "vuex";
import { defaultImgUrl } from "../../source/index";
export default {
  data() {
    return {
      avatarPic: defaultImgUrl,
      picFile: null, //上传的图片文件
    };
  },
  methods: {
    onChange(e) {
      let file = e.target.files[0];
      //console.log(e.target.files[0]);
      if (file.size > 1024 * 1024) {
        return this.open("选择图片的大小要小于1MB");
      }
      if (file.type == "image/jpeg" || file.type == "image/png") {
        this.picFile = file;
        let fr = new FileReader();
        fr.readAsDataURL(file);
        let self = this;
        fr.onload = function () {
          self.avatarPic = fr.result;
        };
      } else {
        return this.open("请选择jpg或者png格式的图片");
      }
    },
    async save() {
      if (!this.picFile) {
        return this.open("请选择图片再上传");
      }
      let fileData = new FormData();
      fileData.append("file", this.picFile);
      let data = await uploadAvatar(fileData);
      if (data) {
        this.updateAvatarUrl(data);
        this.updateRefresh(true);
        this.open("头像更改成功！");
      } else {
        this.open("头像更改失败！");
      }
    },
    open(message) {
      this.$message(message);
    },
    faultImg() {
      this.avatarPic = defaultImgUrl;
    },
    initAvatar() {
      if (this.avatarUrl) {
        //在vuex中有保存的头像地址
        return (this.avatarPic = this.avatarUrl);
      }
    },
    ...mapMutations(["updateAvatarUrl", "updateRefresh"]),
  },
  computed: {
    ...mapState(["avatarUrl"]),
  },
  mounted() {
    this.initAvatar();
  },
};
</script>

<style lang="less" scoped>
.container {
  padding-left: 60px;
  padding-top: 40px;
  .header {
    width: 120px;
    padding: 10px 0;
    text-align: center;
    position: relative;
    text-decoration: none;
    color: white;
    background-color: #48a8ff;
    border-radius: 10px;
    .chooseFile {
      opacity: 0;
      position: absolute;
      overflow: hidden;
      right: 0;
      left: 0;
      top: 0;
      bottom: 0;
      opacity: 0;
    }
  }
  .tip {
    margin-top: 20px;
    color: #ccc;
    font-size: 14px;
  }
  img {
    width: 120px;
    height: 120px;
    border-radius: 50% 50%;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .save {
    width: 120px;
    padding: 10px 0;
    text-align: center;
    text-decoration: none;
    color: white;
    background-color: #48a8ff;
    border-radius: 10px;
    cursor: pointer;
  }
}
</style>