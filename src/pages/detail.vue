<template>
  <div class="page">
    <div class="wrapper">
      <h1 class="title">{{title}}</h1>
      <div class="some">
        <span class="date"><i class="iconfont icon-date"></i>{{date}}</span>
        <span class="category"><i class="iconfont icon-tubiao13"></i><span v-for="tag in category" :key="tag.id">{{tag}}</span></span>
      </div>
      <div class="detail" v-if="content">
          <mavon-editor v-model="content" default_open="preview" :toolbarsFlag="false" :subfield="false"></mavon-editor>
      </div>
      <comment></comment>
    </div>
  </div>
</template>

<script>
import Comment from '../components/comment'

export default {
  data(){
    return{
      title: '',
      date: '',
      category:[],
      gist: '',
      content: '',
    }
  },
  beforeCreate(){
  },
  mounted:function(){
    if (this.$route.params.id) {
      this.$axios.get('/api/articleDetail/' + this.$route.params.id)
        .then(
          (res) => {
            let article=res.data;

            this.title = article.title;
            this.date = article.date;
            this.content = article.content;
            this.gist = article.gist;
            this.category = article.category;
          }
        );
    }
  },
  components:{
    Comment
  }
}
</script>

<style>

</style>

<style lang="scss" scoped>
.wrapper{
  background: #f8f8fd;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4), 0 0 30px rgba(10, 10, 0, 0.1) inset;
  padding: 10px;
  &>.title{
    font-size: 16px;      
    text-align: center;
    font-weight: 500;
  }
  &>.some{
    text-align: center;
    color: #999;
    margin: 10px 0;
    padding-bottom: 10px;
    .iconfont{
      color:#666;
      margin: 0 5px 0 0;
    }
    .date{
      margin: 0 10px 0 0;
    }
    .category>span{margin-right: 5px;}
  }
}


@media (min-width: 768px) { //pc
  .wrapper{
    padding: 20px;
    &>.title{
      font-size: 28px;      
    }
    &>.some{
      margin: 10px 0 40px;
      border-bottom: 1px solid #eee;
      padding-bottom: 20px;
      .iconfont{
        color:#666;
        margin: 0 5px 0 0;
      }
      .date{
        margin: 0 20px 0 0;
      }
    }
  }
}
</style>
