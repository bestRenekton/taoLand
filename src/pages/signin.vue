<template>
  <div id="sign_wrap">
    <div v-if="status==1" class="main signIn">
      <input v-model="name" placeholder="请输入登录账号">
      <input v-model="password" placeholder="请输入密码" type="password">
      <el-button @click="signIn" class="sign" >Sign In</el-button>
      <p class="toSignUp">New to Taoland ? <span @click="toSignUp" > Sign Up !</span></p>
    </div>
    <div v-else-if="status==2" class="main signUp">
      <input v-model="name" placeholder="请输入登录账号">
      <input v-model="nickName" placeholder="请输入昵称">
      <input v-model="password" placeholder="请输入密码" type="password">
      <el-button @click="signUp" class="sign" >Sign Up</el-button>
      <p class="toSignUp"><span @click="back" > Back to Sign In !</span></p>
    </div>
    <div v-else-if="status==3" class="loading">
      <div v-if="!txtSignIn" class="outside"></div>
      <p v-else class="txt">Sign In</p>
		</div>
  </div>
</template>

<script>
import { webUrl, imgTo64 } from "../../static/js/public.js";
import imgDefault from "../../static/img/avatar.png";

export default {
  created() {
    // console.log(urlTo64(imgDefault));
  },
  data() {
    return {
      status: 1, //1登录,2注册，3loading
      name: "",
      password: "",
      nickName: "",
      txtSignIn: false
    };
  },
  mounted() {},
  methods: {
    toSignUp: function() {
      this.status = 2;
      this.reset();
    },
    back: function() {
      this.status = 1;
      this.reset();
    },
    reset: function() {
      this.name = "";
      this.password = "";
      this.nickName = "";
    },
    signUp: function() {
      //注册
      let that = this;
      let image = new Image();

      image.src = imgDefault;
      image.setAttribute("crossOrigin", "anonymous"); //允许图片跨域请求、必须后台也允许
      image.onload = () => {
        let base64 = imgTo64(image);
        // console.log(base64);

        if (that.name.length > 20) {
          that.$message({
            type: "warning",
            message: "登录账号太长!"
          });
          return;
        }
        if (that.nickName.length > 12) {
          that.$message({
            type: "warning",
            message: "昵称太长!"
          });
          return;
        }
        if (
          that.name.length == 0 ||
          that.nickName.length == 0 ||
          that.password.length == 0
        ) {
          that.$message({
            type: "warning",
            message: "有未填写项!"
          });
          return;
        }
        that.$axios
          .post(webUrl + "admin/signUp", {
            name: that.name,
            password: that.password,
            nickName: that.nickName,
            avatar: base64
          })
          .then(response => {
            that.$message({
              type: "success",
              message: response.data.msg
            });
            if (response.data.status == 1) {
              that.back();
            }
          })
          .catch(reject => {
            console.log(reject);
          });
      };
    },
    signIn: function() {
      //登录
      let that=this;
      this.$axios
        .post(webUrl + "admin/signIn", {
          name: this.name,
          password: this.password
        })
        .then(response => {
          if (response.data.status == 1) {
            let type = response.data.type;

            this.status = 3;
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user_name", response.data.user_name);
            localStorage.setItem("nickName", response.data.nickName);
            localStorage.setItem("avatar", response.data.avatar);
            if (type == 1) {
              this.$store.commit("changeIsSignIn", 1); //admin
            } else if (type == 2) {
              this.$store.commit("changeIsSignIn", 2); //游客
              this.$store.commit("changeIndex", "7");
            }
            setTimeout(() => {
              this.txtSignIn = true;
              setTimeout(() => {
                if (type == 1) {
                  this.$router.push({ name: "ArticleList" }); //admin
                } else if (type == 2) {
                  this.$router.push({ name: "visiter" }); //游客
                }
              }, 1500);
            }, 3000);
          } else {
            that.$message({
              type: "error",
              message: response.data.msg
            });
          }
        })
        .catch(reject => {
          console.log(reject);
        });
    }
  },
  beforeCreate: function() {
    document.getElementsByTagName("body")[0].className = "admin";
  },
  beforeDestroy: function() {
    document.body.removeAttribute("class", "admin");
  }
};
</script>

<style scoped lang='scss'>
#sign_wrap {
  width: 300px;
  margin: 200px auto 0;
  input {
    background: hsla(0, 0%, 100%, 0.08);
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: hsla(0, 0%, 100%, 0.58);
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 1;
    outline: 0;
    padding: 0 15px;
    transition: all 0.25s ease;
    width: 100%;
    margin-bottom: 20px;
    &:focus {
      border-color: #409eff;
      background: hsla(0, 0%, 100%, 0.28);
    }
    &::-webkit-input-placeholder {
      color: hsla(0, 0%, 100%, 0.58);
    }
    &::-moz-placeholder {
      color: hsla(0, 0%, 100%, 0.58);
    }
    &:-moz-placeholder {
      color: hsla(0, 0%, 100%, 0.58);
    }
    &:-ms-input-placeholder {
      color: hsla(0, 0%, 100%, 0.58);
    }
  }
  .sign {
    transition: all 0.25s ease;
    background: hsla(0, 0%, 100%, 0.08);
    border: 1px solid hsla(0, 0%, 100%, 0.65);
    border-radius: 3px;
    box-shadow: 0 0 8px hsla(0, 0%, 100%, 0.3);
    color: #fff;
    display: inline-block;
    font-size: 2rem;
    padding: 0.78rem 1.3rem;
    text-decoration: none;
    text-shadow: none;
    width: 300px;
    &:hover {
      background: hsla(0, 0%, 100%, 0.28);
    }
  }
  .toSignUp {
    color: #ddd;
    text-align: center;
    margin: 20px 0;
    font-size: 18px;
    > span {
      color: #ecf5ff;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        color: #5da9ff;
      }
    }
  }
  .loading {
    width: 100px;
    height: 100px;
    position: relative;
    margin: 50px auto;
    .outside {
      border: 4px solid rgba(255, 255, 255, 0.7);
      border-radius: 50%;
      animation: loadOut 1s infinite;
      position: absolute;
      left: 50%;
      top: 50%;
    }
    .txt {
      color: rgba(255, 255, 255, 0);
      animation: txtLarge 1.5s;
      text-align: center;
      line-height: 100px;
    }
  }
  @keyframes loadOut {
    from {
      width: 0;
      height: 0;
      margin-left: 0;
      margin-top: 0;
    }
    to {
      width: 92px;
      height: 92px;
      margin-left: -50px;
      margin-top: -50px;
      opacity: 0;
    }
  }
  @keyframes txtLarge {
    from {
      transform: scale(1);
      color: rgba(255, 255, 255, 0);
    }
    to {
      transform: scale(3);
      color: rgba(255, 255, 255, 0.6);
    }
  }
}
</style>
