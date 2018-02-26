<template>
  <div class="page">
    <div class="wrapper">
        <el-row>
            <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="18">
              <div class="main">
                <p class="title">Collections</p>
                <div class="card" v-for="(item) in items" :key="item.id">
                  <p class="card_title" :id="'anchor-'+item.type">{{item.type}}</p>
                  <ul>
                    <li v-for="li in item.list" :key="li.id">
                      <a :href="li.href" target="_blank" class="title_li">{{li.title}}</a>
                      <p class="gist">{{li.gist}}</p>
                    </li>
                  </ul>
                </div>

              </div>
            </el-col>
            <el-col :xs="0" :sm="4" :md="6" :lg="6" :xl="6">
              <div class="aside">
                <p class="title">Content</p>
                  <div class="content">
                    <ul>
                      <li v-for="li in items" :key="li.id">
                        <a href="javascript:;" class="title" @click="anchor(li.type)">{{li.type}}</a>
                        </li>
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
      items:[
         {
          "type":'工具',
          "list":[
              {"id":1,"href":'www.baidu.com',"title":"tiny png","gist":"使用 JavaScript 创建并下载文件","category":"工具"},
              {"id":2,"href":'www.baidu.com',"title":"tiny png","gist":"如何使用 babel","category":"工具"},
              {"id":3,"href":'www.baidu.com',"title":"tiny png","gist":"浅谈正则表达式中的分组和引用","category":"工具"}
          ]
        },
        {
          "type":'编程语言',
          "list":[
              {"id":4,"href":'www.baidu.com',"title":"tiny png","gist":"使用 JavaScript 创建并下载文件","category":"编程语言"},
              {"id":5,"href":'www.baidu.com',"title":"tiny png","gist":"如何使用 babel","category":"编程语言"},
              {"id":6,"href":'www.baidu.com',"title":"tiny png","gist":"浅谈正则表达式中的分组和引用","category":"编程语言"}
          ]
        }
      ]
    }
  },
  components:{
    // List
  },
  created(){
    // this.$axios.get('http://localhost:8080/static/goods.json').then((data)=>{
    // // this.$axios.get('./static/goods.json').then((data)=>{
    //   console.log(data)
    //   this.items=data.data.archives;
    // })
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
    border-bottom: 1px solid #eee;
    padding: 5px 0;
  }
  .card{
    margin: 10px 0 0 0;
    .card_title{
      font-size: 18px;
      color: #6a6b6b;
      border-bottom: 1px solid #eee;
      margin-bottom: 5px;
    }
    ul{
      padding: 0 10px;
      li{
        list-style-type: none;
        padding: 5px 10px;
        position: relative;
        &::before{
          content: '';
          width:6px;
          height: 6px;
          background: #888;
          position: absolute;
          left: 0;
          top: 15px;
          border-radius: 50%;
        }
        .title_li{
          font-size: 14px;
          margin: 0 5px;
          font-weight: bold;
          color: #4d6dad;
          transition:all .3s;
          &:hover{
            color: #223253;
            background-color: #f4efeb;
          }
        }
        .gist{
          margin:10px 0 0 20px;
          color:#666;
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
      .card{
    margin: 40px 0 0 0;
    .card_title{
      font-size: 26px;
      margin-bottom: 20px;
    }
    ul{
      padding: 0 30px;
      li{
        padding: 5px 16px;
        &::before{
          top: 15px;
        }
        .date{
          display: inline;
        }
        .title_li{
          font-size: 16px;
        }
      }
    }
  }
  }
}
</style>
