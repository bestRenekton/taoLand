<template>
  <div class="page" id="page" @click="clickTips">
      <div class="wrapper">
        <el-row>
            <el-col :xs="24" :sm="4" :md="18" :lg="18" :xl="18">
              <div class="main">
                <p class="title">About</p>
                <!-- <list_article :items="items" type="archives"></list_article> -->
                <div class="card">
                  <p class="card-title" id="anchor-about">关于我</p>
                  <p class="txt">做前端有2年了，目前就职于<a href="http://www.sysdsoft.cn/" target="_blank">北京思源时代</a></p>
                  <p class="txt">并不是科班出身，学的是物理，后来从事不喜欢的工作，直到遇到前端</p>
                  <p class="txt">非常喜欢,开始自学,遇到过很多坑,但是一直坚持,坚信终有一天自己也会变强!</p>
                </div>
                <div class="card">
                  <p class="card-title" id="anchor-contact">联系我</p>
                  <ul>
                    <li>个人主页：<a href="https://www.yangyuetao.cn" target="_blank">taoLand</a></li>
                    <li>Github：<a href="https://github.com/bestRenekton" target="_blank">bestRenekton</a></li>
                    <li><a href="https://www.zhihu.com/people/yang-pang-zi-40/activities" target="_blank">知乎</a></li>
                    <li><a href="http://music.163.com/#/user/home?id=272667179" target="_blank">网易云</a></li>
                    <li>Email： <a href="mailto:342060286@qq.com">342060286@qq.com</a></li>
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
                    <li>服务器是centos的</li>
                  </ul>
                  <div class="update">
                    <h3 id="update-log">Update Log</h3>
                    <p><em>2018.2.28 v1.0.1</em></p>
                    <ul>
                      <li><code class="highlighter-rouge">[+]</code> 个人博客第一版上线</li>
                    </ul>
                    <p><em>2018.3.20 v1.1.1</em></p>
                    <ul>
                      <li><code class="highlighter-rouge">[+]</code>新增流量统计功能</li>
                      <li><code class="highlighter-rouge">[+]</code>新增token功能</li>
                      <li><code class="highlighter-rouge">[+]</code>升到https</li>
                      <li><code class="highlighter-rouge">[+]</code>若干bug</li>
                    </ul>
                    <p><em>2018.6.10 v1.2.1</em></p>
                    <ul>
                      <li><code class="highlighter-rouge">[+]</code>大幅提高首页渲染速度</li>
                      <li><code class="highlighter-rouge">[+]</code>看板娘上线</li>
                      <li><code class="highlighter-rouge">[+]</code>若干优化</li>
                    </ul>
                    <p><em>2018.7.23 v1.3.1</em></p>
                    <ul>
                      <li><code class="highlighter-rouge">[+]</code>游客登陆/注册/检测</li>
                      <li><code class="highlighter-rouge">[+]</code>图片上传</li>
                      <li><code class="highlighter-rouge">[+]</code>评论留言</li>
                      <li><code class="highlighter-rouge">[+]</code>文章分享功能</li>
                      <li><code class="highlighter-rouge">[+]</code>上一篇下一篇</li>
                    </ul>
                    <!-- <p><em>2018.7.23 v1.3.1</em></p>
                    <ul>
                      <li><code class="highlighter-rouge">[+]</code>music</li>
                      <li><code class="highlighter-rouge">[+]</code>文章配图</li>
                      <li><code class="highlighter-rouge">[+]</code>分页功能</li>
                      <li><code class="highlighter-rouge">[+]</code>后台消息功能</li>
                      <li><code class="highlighter-rouge">[+]</code>redis</li>
                    </ul> -->
                  </div>
                </div>
                <div class="card">
                  <p class="card-title" id="anchor-friend">友情链接</p>
                  <div class="row-link">
                    <a class="link" href="https://www.yangyuetao.cn" target="_blank">哈维</a>|
                    <a class="link" href="https://www.yangyuetao.cn" target="_blank">的光和热</a>|
                    <a class="link" href="https://www.yangyuetao.cn" target="_blank">Secret Blog</a>|
                    <a class="link" href="https://www.yangyuetao.cn" target="_blank">Secret Blog</a>|
                    <a class="link" href="https://www.yangyuetao.cn" target="_blank">Secret Blog</a>|
                    <a class="link" href="https://www.yangyuetao.cn" target="_blank">Secret Blog</a>
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
import { anchor } from "../../static/js/public.js";

const arr = [
  "富强",
  "民主",
  "文明",
  "和谐",
  "自由",
  "平等",
  "公正",
  "法治",
  "爱国",
  "敬业",
  "诚信",
  "友善"
];
const setStyle = (obj, json) => {
  for (var i in json) {
    obj.style[i] = json[i];
  }
};

let index = 0;

export default {
  mixins: [anchor],
  data() {
    return {
      // items:[]
    };
  },
  components: {},
  created() {
    // this.$http.get('/api/goods').then((data)=>{
    //   this.items=data.body.data;
    // })
  },
  methods: {
    clickTips: function(e) {
      if (index >= arr.length) {
        index = 0;
      }
      let newA = document.createElement("a");
      newA.className = "click_tips";
      let styles = {
        left: `${e.pageX}px`,
        top: `${e.pageY - 20}px`
      };
      newA.innerHTML = arr[index];
      setStyle(newA, styles);
      document.getElementById("page").appendChild(newA);
      index++;
      newA.addEventListener("animationend", () => {
        document.getElementById("page").removeChild(newA);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  background: #f8f8fd;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4), 0 0 30px rgba(10, 10, 0, 0.1) inset;
  margin: 0 10px;
  padding: 10px;
  > .title {
    font-size: 18px;
    padding: 5px 0;
  }
  .card {
    border-top: 1px solid #eee;
    .card-title {
      margin: 20px 0 10px;
      font-size: 26px;
    }
    .txt {
      font-size: 16px;
      margin: 0 20px 10px;
    }
    > ul {
      padding: 20px 30px;
      > li {
        padding: 10px 0;
      }
    }
    a {
      color: #4d6dad;
      &:hover {
        color: #223253;
        background-color: #f4efeb;
      }
    }
    .update {
      padding: 20px;
      h3 {
        margin: 0;
      }
      > p {
        margin: 10px;
      }
      > ul {
        padding: 0 30px;
      }
    }
    .row-link {
      padding: 20px;
      .link {
        margin: 5px;
        &:hover {
          color: #0085a1;
        }
      }
    }
  }
}
.aside {
  background: #f8f8fd;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4), 0 0 30px rgba(10, 10, 0, 0.1) inset;
  > .title {
    font-size: 16px;
    font-weight: 600;
    border-bottom: 1px solid #ddd;
    padding: 10px 15px;
  }
  .content {
    padding: 15px 30px;
    li {
      list-style-type: none;
      padding: 5px 16px;
      position: relative;
      &::before {
        content: "";
        width: 6px;
        height: 6px;
        background: #333;
        position: absolute;
        left: 0;
        top: 13px;
        border-radius: 50%;
      }
      > a {
        color: #4d6dad;
        &:hover {
          color: #223253;
        }
      }
    }
  }
}

@media (min-width: 768px) {
  //pc
  .main {
    margin: 0 20px;
    padding: 20px;
    > .title {
      font-size: 30px;
    }
  }
}
</style>
<style>
/* click_tips */
.click_tips {
  color: red;
  position: absolute;
  transition: all 0.3s;
  animation: click_translateTop 1s;
}

@keyframes click_translateTop {
  0%,
  100% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  100% {
    transform: translateY(-30px);
  }
}
</style>

