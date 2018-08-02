<template>
  <div class="page">
    <div class="wrapper">
      <h1 class="title">{{title}}</h1>
      <div class="some">
        <span class="date"><i class="iconfont icon-date"></i>{{date}}</span>
        <span class="category"><i class="iconfont icon-tubiao13"></i><span v-for="tag in category" :key="tag.id">{{tag}}</span></span>
      </div>
      <div class="detail" v-if="content">
          <mavon-editor v-model="content" default_open="preview" defaultOpen= "preview"  :toolbarsFlag="false" :subfield="false"></mavon-editor>
          <div class="footer">
            <div @click="toGo(prev._id)" class="btn prev"><p>←上一篇</p><p>{{prev.title?prev.title:'没有更多'}}</p></div>
            <div @click="toGo(next._id)" class="btn next"><p>下一篇→</p><p>{{next.title?next.title:'没有更多'}}</p></div>
          </div>
      </div>
      <comment :comments="comments" :articleId="articleId" @update="update" @setTextarea="setTextarea"></comment>
    </div>
  </div>
</template>

<script>
import Comment from "../components/comment";
import { webUrl } from "../../static/js/public.js";

export default {
  data() {
    return {
      title: "",
      date: "",
      category: [],
      gist: "",
      content: "",
      comments: [],
      articleId: null,
      prev: {},
      next: {}
      // comments: [
      //   {
      //     id: 0,
      //     from_uid: 11111,
      //     from_uname: "非洲刘德华",
      //     avatar: avatar,
      //     to_uid: null,
      //     content: "啊十分大师傅",
      //     date: "2018-07-18 20:12",
      //     open:false,
      //     child: [
      //       {
      //         from_uid: 2222,
      //         from_uname: "乌鸦坐飞机",
      //         avatar: avatar,
      //         to_uid: 1111,
      //         to_uname: "非洲刘德华",
      //         content: "asdf撒旦飞洒发的",
      //         date: "2018-07-18 20:12"
      //       }
      //     ]
      //   },
      //   {
      //     id: 1,
      //     from_uid: 11111,
      //     from_uname: "非洲刘德华",
      //     avatar: avatar,
      //     to_uid: null,
      //     content: "啊十分大师傅",
      //     date: "2018-07-18 20:12",
      //     open:false,
      //     child: [
      //       {
      //         from_uid: 2222,
      //         from_uname: "乌鸦坐飞机",
      //         avatar: avatar,
      //         to_uid: 1111,
      //         to_uname: "非洲刘德华",
      //         content: "asdf撒旦飞洒发的",
      //         date: "2018-07-18 20:12"
      //       },
      //       {
      //         from_uid: 3333,
      //         from_uname: "飞机",
      //         avatar: avatar,
      //         to_uid: 11111,
      //         to_uname: "非洲刘德华",
      //         content: "asdf撒旦飞洒发的",
      //         date: "2018-07-18 20:12"
      //       },
      //       {
      //         from_uid: 11111,
      //         from_uname: "非洲刘德华",
      //         avatar: avatar,
      //         to_uid: 2222,
      //         to_uname: "乌鸦坐飞机",
      //         content: "asdf撒旦飞洒发的",
      //         date: "2018-07-18 20:12"
      //       }
      //     ]
      //   }
      // ]
    };
  },
  beforeCreate() {

  },
  mounted: function() {
    this.init();
  },
  methods: {
    init: function() {
      if (this.$route.params.id) {
        this.articleId = this.$route.params.id;
        this.$axios
          .get(webUrl + "articleDetail/" + this.$route.params.id)
          .then(res => {
            let article = res.data;
            let {
              comments,
              title,
              date,
              content,
              gist,
              category,
              prev,
              next
            } = res.data;

            this.title = title;
            this.date = date;
            this.content = content;
            this.gist = gist;
            this.category = category;
            this.prev = prev;
            this.next = next;
            if (comments) {
              for (let i = 0; i < comments.length; i++) {
                comments[i]["open"] = false;
                comments[i]["to_uid"] = comments[i]["from_uid"];
                comments[i]["to_uname"] = comments[i]["from_uname"];
              }
              this.comments = comments;
            }
          });
      }
    },
    update: function() {
      this.init();
    },
    /**
     * 改变输入框状态
     * index评论序号
     * open 该评论下输入框开否
     * to_uid 该评论下目标用户id
     * to_uname 该评论下目标name
     */
    setTextarea: function(params) {
      let { index, open, to_uid, to_uname } = params;
      let comments = this.comments;
      // console.log(params)
      if (to_uid) {
        comments[index]["to_uid"] = to_uid;
        comments[index]["to_uname"] = to_uname;
      }
      comments[index]["open"] = open;
      // debugger
      this.comments = comments;
    },
    toGo: function(id) {
      if (id) {
        this.$router.push({ path: `/detail/${id}` });
        // this.$router.push({ path: '/detail/'+id});

        // this.$router.push({ path: '/visiter'});
      }
    }
  },
  components: {
    Comment
  },
  watch: {
    //监听路由参数变化后刷新页面
    $route(to, from) {
      this.init();
      Math.animation(
        document.documentElement.scrollTop,
        0,
        0,
        "Quart.easeOut",
        function(value) {
          document.documentElement.scrollTop = value;
          document.body.scrollTop = value;
        }
      );
    }
  }
};
</script>

<style>
</style>

<style lang="scss" scoped>
.wrapper {
  background: #f8f8fd;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4), 0 0 30px rgba(10, 10, 0, 0.1) inset;
  padding: 10px;
  & > .title {
    font-size: 16px;
    text-align: center;
    font-weight: 500;
  }
  & > .some {
    text-align: center;
    color: #999;
    margin: 10px 0;
    padding-bottom: 10px;
    .iconfont {
      color: #666;
      margin: 0 5px 0 0;
    }
    .date {
      margin: 0 10px 0 0;
      vertical-align: middle;
    }
    .category {
      vertical-align: middle;
      & > span {
        margin-right: 5px;
      }
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
    margin: 20px 20%;
    border-radius: 6px;
    .btn {
      text-align: center;
      background: #fff;
      color: #666;
      padding: 10px;
      flex: 1;
      border: 1px solid #ddd;
      transition: all 0.3s;
      overflow: hidden;
      cursor: pointer;
      &:hover {
        background: #3b99fc;
        color: #fff;
      }
      p {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &.prev {
        border-right: none;
      }
      &.next {
      }
    }
  }
}

@media (min-width: 768px) {
  //pc
  .wrapper {
    padding: 20px;
    & > .title {
      font-size: 28px;
    }
    & > .some {
      margin: 10px 0 40px;
      border-bottom: 1px solid #eee;
      padding-bottom: 20px;
      .iconfont {
        color: #666;
        margin: 0 5px 0 0;
      }
      .date {
        margin: 0 20px 0 0;
      }
    }
  }
}
</style>
