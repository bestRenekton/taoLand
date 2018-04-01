<template>
  <div class="page">
      <div class="wrapper">
        <el-row>
            <el-col :xs="24" :sm="4" :md="18" :lg="18" :xl="18">
              <div class="main">
                <list_home :items="items"></list_home>
              </div>
            </el-col>
            <el-col :xs="0" :sm="4" :md="6" :lg="6" :xl="6">
              <div class="aside">
                <div class="card">
                  <p class="title">ABOUT ME</p>
                  <img class="pic" src="http://www.yyyweb.com/demo/hover-effects/img/3.jpg" alt="">
                  <div class="row">
                    <p>行路有良友，便是捷径。带上我吧，一起去看更大的世界</p>
                    <div class="icons">
                      <a href="https://github.com/bestRenekton" target="_blank"><i class="iconfont icon-github"></i></a>
                      <a href="https://www.zhihu.com/people/yang-pang-zi-40/activities" target="_blank"><i class="iconfont icon-zhihu"></i></a>
                      <a href="http://music.163.com/#/user/home?id=272667179" target="_blank"><i class="iconfont icon-yinle"></i></a>
                      <a href="https://weibo.com/u/5746403289?refer_flag=1005055010_&is_all=1" target="_blank"><i class="iconfont icon-weibo"></i></a>
                    </div>
                  </div>
                </div>
                <div class="card">
                  <p class="title">FRIENDS</p>
                  <div class="row">
                    <a class="link" href="dff" target="_blank">xxxxx的博客</a>
                    <a class="link" href="dff" target="_blank">咕咚</a>
                    <a class="link" href="dff" target="_blank">Secret Blog</a>
                    <a class="link" href="dff" target="_blank">Secret Blog</a>
                    <a class="link" href="dff" target="_blank">Secret Blog</a>
                    <a class="link" href="dff" target="_blank">Secret Blog</a>
                  </div>
                </div>
              </div>
            </el-col>
        </el-row>
      </div>
  </div>
</template>

<script>
import List_home from "../components/list_home"
export default {
  data(){
    return{
      items:[]
    }
  },
  components:{
    List_home,
  },
  created(){
    this.$axios.post('/api/articleList')
      .then((res)=>{
        this.items=res.data;
      })
  }
}
</script>

<style lang="scss" scoped>
.main{
  background: #f8f8fd;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4), 0 0 30px rgba(10, 10, 0, 0.1) inset;
  margin:0 10px;
  padding: 10px;
}
.aside{
  background: #f8f8fd;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4), 0 0 30px rgba(10, 10, 0, 0.1) inset;
  .card{
    border-top: 1px solid #eee;
    .title{
      padding: 10px;
      font-weight: 600;
      color:#808080;
      margin-bottom: 10px;
    }
    .pic{
      width: 100%;
    }
    .row{
      padding: 0 10px;
      &>p{
        color:#bfbfbf;
        
      }
      .icons{
        padding:10px 0;
        .iconfont{
          transition: all .3s;
          margin: 5px;
          color: #000;
          font-size: 20px;
          background-color: rgba(200, 200, 200, 0.3);
          padding: 8px;
          border-radius: 50%;
          &:hover{            
            color:#fff;
            background-color: rgba(0, 133, 166, 0.8);
            border-radius: 5px;          
          }
        }
      }

      &>.link{
        color:#bfbfbf;
        display: inline-block;
        padding: 5px;
        transition: all .3s;        
        &:hover{
          color: #0085a1;
        }
      }
    }
  }
}

@media (min-width: 768px) {//pc
  .main{
    margin:0 20px;
    padding: 20px;
  }
}
</style>
