<template>
    <div class="page">
      <div class="wrapper">
        <div class="content">
          <el-row class="row">
            <el-col :xs="4" :sm="6" :md="6" :lg="6" :xl="6">
              <p class="label">昵称：</p>
            </el-col>
            <el-col :xs="20" :sm="18" :md="18" :lg="18" :xl="18">
              <el-input class="input" v-model="nickName" placeholder="请输入昵称"></el-input>
            </el-col>
          </el-row>
          <el-row class="row">
            <el-col :xs="4" :sm="6" :md="6" :lg="6" :xl="6">
              <p class="label">头像：</p>
            </el-col>
            <el-col :xs="20" :sm="18" :md="18" :lg="18" :xl="18">
              <label for="upLoad">
                <img :src="avatar" alt="" class="avatar">
              </label>
              <input @change="upLoad" id="upLoad" type="file">
              <p class="tips">tips:请上传2M以内JPG/PNG格式的图片，比例最好1:1</p>
            </el-col>
          </el-row>
          <el-row class="row ">
            <el-col class="bar" :offset="6" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
              <el-button @click="save" type="primary">Save</el-button>
              <el-button @click="signOut">Sign Out</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
</template>

<script>
import { imgTo64, checkVisiter, webUrl } from "../../../static/js/public.js";
export default {
  mixins: [checkVisiter],
  data() {
    return {
      nickName: null,
      avatar: null,
      name: null,
      token: null
    };
  },
  created() {
    this.nickName = localStorage.getItem("nickName");
    this.avatar = localStorage.getItem("avatar");
    this.name = localStorage.getItem("user_name");
    this.token = localStorage.getItem("token");
  },
  methods: {
    upLoad: function(e) {
      //上传头像
      let that = this;
      let files = e.target.files || e.dataTransfer.files;

      if (!files.length) return;
      if (
        files[0].type.indexOf("png") > -1 ||
        files[0].type.indexOf("jpg") > -1 ||
        files[0].type.indexOf("jpeg") > -1
      ) {
        if (files[0].size < 2000000) {
          if (typeof FileReader === "undefined") {
            alert("您的浏览器不支持图片上传，请升级您的浏览器");
          }
          let reader = new FileReader();
          reader.readAsDataURL(files[0]);
          reader.onload = function(e) {
            let image = new Image();
            image.src = e.target.result; //原始base64
            image.setAttribute("crossOrigin", "anonymous"); //允许图片跨域请求、必须后台也允许
            image.onload = () => {
              let base64 = imgTo64(image); //使用cavas压缩
              that.avatar = base64;
            };
          };
        } else {
          alert("请上传2M以内的图片");
        }
      } else {
        alert("请上传JPG/PNG格式的图片");
      }
    },
    save: function() {
      //保存
      let that = this;
      that.$axios
        .post(webUrl + "admin/updateUser", {
          name: that.name,
          token: that.token,
          nickName: that.nickName,
          avatar: that.avatar
        })
        .then(response => {
          alert(response.data.msg);
          if (response.data.status == 1) {
            localStorage.setItem("nickName", response.data.nickName);
            localStorage.setItem("avatar", response.data.avatar);
          }
        })
        .catch(reject => {
          console.log(reject);
        });
    },
    signOut: function() {
      //退出
      let that = this;
      that.$axios
        .post(webUrl + "admin/signOut", {
          name: that.name,
          token: that.token
        })
        .then(response => {
          alert(response.data.msg);
          if (response.data.status == 1) {
            this.$store.commit("changeIsSignIn", 0);
            this.$store.commit("changeIndex", "1");
            localStorage.clear();
            this.$router.replace({ name: "home" });
          }
        })
        .catch(reject => {
          console.log(reject);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
#upLoad {
  display: none;
}
.content {
  width: 90%;
  margin: 0 auto;
  padding: 50px 0;
  .row {
    padding: 10px 0;
    .label {
      text-align: right;
      line-height: 40px;
    }
    .input {
      margin-left: 30px;
      width: 70%;
    }
    .avatar {
      width: 100px;
      height: 100px;
      display: block;
      margin: 0 auto;
      background: #eee;
      border-radius: 50%;
      cursor: pointer;
    }
    .tips {
      font-size: 12px;
      color: #999;
      margin: 30px 0 0 40px;
    }
    .bar {
      text-align: center;
      padding: 50px 0 0 0;
    }
  }
}
@media (min-width: 768px) {
  //pc
  .content {
    width: 40%;
    margin: 0 auto;
    padding: 50px 0;
    .row {
      padding: 10px 0;
      .label {
        text-align: right;
        line-height: 40px;
      }
      .input {
        margin-left: 30px;
      }
      .avatar {
        width: 100px;
        height: 100px;
        display: block;
        margin: 0 auto;
        background: #eee;
        border-radius: 50%;
        cursor: pointer;
      }
      .tips {
        font-size: 12px;
        color: #999;
        margin: 30px 0 0 40px;
      }
      .bar {
        text-align: center;
        padding: 50px 0 0 0;
      }
    }
  }
}
</style>
