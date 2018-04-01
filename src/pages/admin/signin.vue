<template>
  <div id="sign_wrap">
    <div v-if="!loading">
      <input v-model="name" placeholder="请输入用户名">
      <input v-model="password" placeholder="请输入密码" type="password">
      <el-button class="sign" @click="signUp">Sign Up</el-button>
      <el-button class="sign" type="primary" @click="signIn">Sign In</el-button>
    </div>
    <div v-else class="loading">
      <div class="outside"></div>
		</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      password: '',
      loading:false
    }
  },
  methods: {
    signUp: function () {
      this.$axios.post('/api/admin/signUp', {'name': this.name, 'password': this.password})
        .then((response) => {
          alert(response.data.msg);
        })
        .catch((reject) => {
          console.log(reject)
        })
    },
    signIn: function () {
      this.$axios.post('/api/admin/signIn', {'name': this.name, 'password': this.password})
        .then((response) => {
          if(response.data.status==1){
            this.loading=true;
            setTimeout(() => {
              this.$router.push({name:'ArticleList'})
            }, 3000);
          }else{
            alert(response.data.msg)
          }
        })
        .catch((reject) => {
          console.log(reject)
        })
    },
    checkUser: function () {
      this.$axios.post('/api/admin/checkUser', {'name': this.name, 'password': this.password})
        .then((response) => {
          console.log(response)
        })
        .catch((reject) => {
          console.log(reject)
        })
    }
  },
  beforeCreate: function() {
    document.getElementsByTagName("body")[0].className="admin";
  },
  beforeDestroy: function() {
    document.body.removeAttribute("class","admin");
  }
}
</script>

<style scoped lang='scss'>
/* .hello{height: 100%;background: url(../assets/bg.jpg)} */
  #sign_wrap {
    width: 300px;
    margin: 200px auto;
    input{
      background: hsla(0,0%,100%,.08);
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      box-sizing: border-box;
      color: hsla(0,0%,100%,.58);
      display: inline-block;
      font-size: inherit;
      height: 40px;
      line-height: 1;
      outline: 0;
      padding: 0 15px;
      transition: all .25s ease;
      width: 100%;
      margin-bottom: 20px;
      &:focus{
        border-color: #409EFF;
        background: hsla(0,0%,100%,.28);        
      }
    }
    .sign{
      transition: all .25s ease;
      background: hsla(0,0%,100%,.08);
      border: 1px solid hsla(0,0%,100%,.65);
      border-radius: 3px;
      box-shadow: 0 0 8px hsla(0,0%,100%,.3);
      color: #fff;
      display: inline-block;
      font-size: 2rem;
      padding: .78rem 1.3rem;
      text-decoration: none;
      text-shadow: none;
      margin: 0 0 10px;
      width: 300px;
      &:hover{
       background: hsla(0,0%,100%,.28);        
      }
    }
    .loading{width: 100px;height: 100px;position: relative;margin: 50px auto;}
		.loading .outside{
		    border: 4px solid rgba(255,255,255,.7);
		    border-radius: 50%;
		    animation: loadOut 1s infinite;
		    position: absolute;
		    left: 50%;
		    top:50%;
		}
		@keyframes loadOut{
		    from {width:0;height: 0;margin-left:0;margin-top:0;}
		    to {width:92px;height: 92px;margin-left: -50px;margin-top: -50px;opacity: 0}
		}
  }
</style>
