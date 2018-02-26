<template>
    <div class="edit_wrap">
      <div class="return_button">
        <el-button icon="arrow-left" @click="goBack">返回</el-button>
      </div>
      <div class="edit_head">标题</div>
      <el-input v-model="title" placeholder="请输入标题"></el-input>
      <div class="edit_head">路径</div>
      <el-input v-model="file" placeholder="请输入路径"></el-input>
      <div class="edit_head">图片</div>
      <el-input v-model="pic" placeholder="请输入图片路径"></el-input>
      <div class="edit_head">简介</div>
      <el-input
          type="textarea"
          :rows="5"
          placeholder="请输入简介"
          v-model="gist">
      </el-input>
      <div class="save_button">
        <el-button type="primary" @click="saveArticle">保存</el-button>
      </div>
    </div>
</template>

<script>
import {checkUser} from '../../../static/js/public.js'

  export default {
    mixins: [checkUser],
    data() {
      return {
        title: '',
        date: '',
        file:'',
        pic:'',
        gist: '',
      }
    },
    beforeCreate:function(){
      // this.$axios.post('/api/admin/checkUser')
      //   .then((response) => {
      //     if(response.data.status==0){
      //       this.$router.replace({name:'index'})
      //     }
      //   })
      //   .catch((reject) => {
      //     console.log(reject)
      //   })
    },
    mounted: function () {
      if (this.$route.params.id) {
        this.$axios.get('/api/demoDetail/' + this.$route.params.id)
          .then(
            (res) => {
              let article=res.data;

              this.title = article.title;
              this.date = article.date;
              this.file = article.file;
              this.pic = article.pic;
              this.gist = article.gist;
              // setTimeout(() => {
              // document.querySelector('.v-show-content').innerHTML=article.html;
              // }, 500);
            }
          );
      }
    },
    methods: {
      // 获取发表时间
      getDate: function () {
        let mydate, y, m, d, hh, mm, ss;
        mydate = new Date()
        y = mydate.getFullYear()
        m = mydate.getMonth()+1
        d = mydate.getDate()
        hh = mydate.getHours()
        mm = mydate.getMinutes()
        ss = mydate.getSeconds()
        if (m < 10) m = '0' + m
        if (d < 10) d = '0' + d
        if (hh < 10) hh = '0' + hh
        if (mm < 10) mm = '0' + mm
        if (ss < 10) ss = '0' + ss
        this.date = y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
      },
      // 保存文章
      saveArticle: function () {
        let self = this
        if (this.title.length === 0) {
          this.$notify({
            title: '提醒',
            message: '请输入标题',
            type: 'warning'
          })
          return
        }
        if (this.pic.length === 0) {
          this.$notify({
            title: '提醒',
            message: '请输入pic',
            type: 'warning'
          })
          return
        }
        if (this.file.length === 0) {
          this.$notify({
            title: '提醒',
            message: '请输入file',
            type: 'warning'
          })
          return
        }
        if (this.gist.length === 0) {
          this.$notify({
            title: '提醒',
            message: '请输入简介',
            type: 'warning'
          })
          return
        }
        if (this.$route.params.id) {
          // 更新文章
          let obj = {
            _id: this.$route.params.id,
            title: this.title,
            date: this.date,
            file: this.file,
            pic: this.pic,
            gist: this.gist,
            // html:document.querySelector('.v-show-content').innerHTML
          }
          
          this.$axios.post('/api/admin/updateDemo', {demoInformation: obj})
            .then(
              response => {
                self.$message({
                  message: '更新文章成功',
                  type: 'success'
                })
              })
        } else {
          // 新建文章
          // 获取时间
          this.getDate()
          let obj = {
            title: this.title,
            date: this.date,
            file: this.file,
            pic: this.pic,
            gist: this.gist,
            // html:document.querySelector('.v-show-content').innerHTML
          }

          this.$axios.post('/api/admin/saveDemo', {demoInformation: obj})
          .then((res)=>{
            if(res.data.status==1){
                self.$message({
                  message: '发表demo成功',
                  type: 'success'
                })
                // 保存成功后跳转至文章列表页
                this.refreshArticleList()
              }
            })
        }
      },
      // 保存成功后跳转至文章列表页
      refreshArticleList: function () {
        this.$router.push({name:'ArticleList'})
      },
      goBack: function () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped lang='scss'>
  .edit_wrap {
    width: 1600px;
    margin: 30px auto;
    background: #fff;
    padding: 40px;
    font-size: 16px;
    .return_button {
      text-align: right;
      margin-bottom: 40px;
    }
    .category{
      text-align: left;
    }
    textarea {
      outline: none;
      font-size: 16px;
    }
    .edit_head {
      margin: 20px 0;
      text-align: left;
    }
    .save_button {
      padding: 40px 0;
    }
  }


</style>