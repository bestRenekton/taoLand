<template>
  <div class="page">
      <div class="wrapper">
        <el-row>
            <el-col :xs="24" :sm="4" :md="18" :lg="18" :xl="18">
              <div class="main">
                <p class="title">About</p>
                <!-- <list_article :items="items" type="archives"></list_article> -->
                <div class="card">
                  <p class="card-title" id="anchor-about">关于我</p>
                  <p class="txt">个文章是自己刚学习配置nginx和nodejs时候记录的,阿里云服务器ECS centos7.2搭建nginx环境以及负载均衡 </p>
                  <p class="txt">个文章是自己刚学习配置nginx和nodejs时候记录的,器ECS centos7.2搭建nginx环境以及负载均衡 </p>
                  <p class="txt">个文章是自己刚学习配置nginx和nodejs时候记录的,比较入门,器ECS centos7.2搭建nginx环境以及负载均衡 </p>
                </div>
                <div class="card">
                  <p class="card-title" id="anchor-contact">联系我</p>
                  <ul>
                    <li>个人主页：<a target="_blank" href="https://www.yangyuetao.cn">taoLand</a></li>
                    <li>Github：<a target="_blank" href="https://github.com/bestRenekton">bestRenekton</a></li>
                    <li>Email： <a target="_blank" href="mailto:342060286@qq.com">342060286@qq.com</a></li>
                    <li>QQ：342060286</li>
                  </ul>
                </div>
                <div class="card">
                  <p class="card-title" id="anchor-us">关于本站</p>
                   <p class="txt">这个博客主要用于记录一个菜鸟程序猿的Growth之路.</p>
                  <p class="txt">这也是自己第一次做博客，希望和大家多多交流，一起成长！</p>
                  <p class="txt">欢迎大家提一些对本站的建议，可以直接在下面留言或者新建一个<a href="https://github.com/bestRenekton/taoLand/issues" target="_blank">Issue.</a></p>
                  <ul>
                    <li>实现了用户注册、登录、检测登录、博客管理（文章的修改和删除）、文章编辑（Markdown）、标签分类等功能。</li>
                    <li>前端使用vue全家桶（cli,router,vuex,axios），框架用的elmentUI</li>
                    <li>后端使用node,框架用的express,mongoose</li>
                    <li>数据库采用mongodb</li>
                  </ul>
                  <div class="update">
                    <h3 id="update-log">Update Log</h3>
                    <p><em>2017.2.28</em></p>
                    <ul>
                      <li><code class="highlighter-rouge">[+]</code> 在文章页中添加上一篇和下一篇文章链接。</li>
                      <li><code class="highlighter-rouge">[^]</code> 修改 font-family 顺序，避免微软雅黑将单引号解析为全角。</li>
                      <li><code class="highlighter-rouge">[^]</code> 修复标签云算法中被除数为零的 bug。<a href="https://github.com/Gaohaoyang/gaohaoyang.github.io/issues/26">#26</a>, <a href="https://github.com/Gaohaoyang/gaohaoyang.github.io/issues/28">#28</a>, <a href="https://github.com/Gaohaoyang/gaohaoyang.github.io/issues/30">#30</a></li>
                    </ul>
                     <p><em>2018.2.28</em></p>
                    <ul>
                      <li><code class="highlighter-rouge">[+]</code> 在文章页中添加上一篇和下一篇文章链接。</li>
                      <li><code class="highlighter-rouge">[^]</code> 修改 font-family 顺序，避免微软雅黑将单引号解析为全角。</li>
                      <li><code class="highlighter-rouge">[^]</code> 修复标签云算法中被除数为零的 bug。<a href="https://github.com/Gaohaoyang/gaohaoyang.github.io/issues/26">#26</a>, <a href="https://github.com/Gaohaoyang/gaohaoyang.github.io/issues/28">#28</a>, <a href="https://github.com/Gaohaoyang/gaohaoyang.github.io/issues/30">#30</a></li>
                    </ul>
                  </div>
                </div>
                <div class="card">
                  <p class="card-title" id="anchor-friend">友情链接</p>
                  <div class="row-link">
                    <a class="link" href="dff" target="_blank">xxx的个人网站</a>|
                    <a class="link" href="dff" target="_blank">咕咚</a>|
                    <a class="link" href="dff" target="_blank">Secret Blog</a>|
                    <a class="link" href="dff" target="_blank">Secret Blog</a>|
                    <a class="link" href="dff" target="_blank">Secret Blog</a>|
                    <a class="link" href="dff" target="_blank">Secret Blog</a>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :xs="0" :sm="4" :md="6" :lg="6" :xl="6">
              <div class="aside">
                <p class="title">Content</p>
                <!-- <list_content :items="items"></list_content> -->
                  <div class="content">
                    <ul>
                      <li><a href="javascript:;" class="title" @click="anchor('about')">关于我</a></li>
                      <li><a href="javascript:;" class="title" @click="anchor('contact')">联系我</a></li>
                      <li><a href="javascript:;" class="title" @click="anchor('us')">关于本站</a></li>
                      <li><a href="javascript:;" class="title" @click="anchor('friend')">友情链接</a></li>
                    </ul>
                  </div>
              </div>
            </el-col>
        </el-row>
      </div>
  </div>
</template>

<script>
import {anchor} from '../../static/js/public.js'

export default {
  mixins: [anchor],
  data(){
    return{
      // items:[]
    }
  },
  components:{
  },
  created(){
    // this.$http.get('/api/goods').then((data)=>{
    //   this.items=data.body.data;
    // })
  },
  methods:{
    // anchor:function(e){
    //     let id='anchor-'+e;
    //     let anchor=document.getElementById(id);
    //     let go=anchor.offsetTop;
  
    //     // console.log(go)
    //     Math.animation(document.documentElement.scrollTop,go,600,'Quart.easeOut', function (value) {
    //         document.documentElement.scrollTop = value;
    //     });
    //   }
  }
}
</script>

<style lang="scss" scoped>
.main{
  background: #f8f8fd;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4), 0 0 30px rgba(10, 10, 0, 0.1) inset;
  margin:0 10px;
  padding: 10px;
  >.title{
    font-size: 18px;
    padding: 5px 0;
  }
  .card{
    border-top: 1px solid #eee;
    .card-title{
      margin: 20px 0 10px;
      font-size: 26px;
    }
    .txt{
      font-size: 16px;
      margin:0 20px 10px;
    }
    >ul{
      padding: 20px 30px;
      >li{
        padding: 10px 0;
        >a{
          color: #4d6dad;
          &:hover{
            color: #223253;
            background-color: #f4efeb;
          }
        }
      }
    }
    .update{
      padding: 20px;
      h3{margin: 0;}
      >p{margin: 10px;}
      >ul{padding: 0 30px;}
    }
    .row-link{
      padding: 20px;
      .link{
        margin: 5px;
        &:hover{
          color: #0085a1;
        }
      }
    }
  }
}
.aside{
  background: #f8f8fd;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4), 0 0 30px rgba(10, 10, 0, 0.1) inset;
  >.title{
    font-size: 16px;
    font-weight: 600;
    border-bottom: 1px solid #ddd;
    padding:10px 15px;
  }
  .content{
    padding:15px 30px;
    li{
      list-style-type: none;
      padding: 5px 16px;
      position: relative;
      &::before{
        content: '';
        width:6px;
        height: 6px;
        background: #333;
        position: absolute;
        left: 0;
        top: 13px;
        border-radius: 50%;
      }
      >a{
        color: #4d6dad;
        &:hover{color:#223253;}
      }
    }
  }
}

@media (min-width: 768px) {//pc
  .main{
    margin:0 20px;
    padding: 20px;
    >.title{
      font-size: 30px;
    }
  }
}
</style>
