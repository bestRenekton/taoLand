<template>
<div>
  <div class="card" v-for="(item) in items" :key="item.id">
    <p class="card_title" :id="'anchor-'+item.type">{{item.type}}</p>
    <ul>
      <li v-for="li in item.list" :key="li.id">
        <span class="date">{{li.date}}</span>
        <router-link :to="'/detail/'+li._id"  class="title">{{ li.title }}</router-link>
        <!-- <router-link v-if="type=='archives'" @click='goCategory' to="/categories"  class="category"><i class="iconfont icon-tubiao13"></i><span class="link">{{ li.category }}</span></router-link> -->
        <a v-if="type=='archives'" href="javascript:;" @click='goCategory()' class="category">
          <i class="iconfont icon-tubiao13"></i>
          <template v-for="tag in li.category">
            <span class="link" :key="tag.id">{{ tag }}</span>
          </template>
        </a>
        <a v-else-if="type=='categories'" href="javascript:;" @click="anchor(li.category)" class="category">
          <i class="iconfont icon-tubiao13"></i>
          <template v-for="tag in li.category">
            <span class="link" :key="tag.id">{{ tag }}</span>
          </template>
        </a>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  // data(){
  //   return{
  //     list:[]
  //   }
  // },
  props: ['items','type'],  
  methods:{
    goCategory:function(e){
      this.$store.commit('changeIndex','3')
      this.$router.push({ path: '/categories'})
    },
    anchor:function(e){
      let id='anchor-'+e;
      let anchor=document.getElementById(id);
      let go=anchor.offsetTop;

      // console.log(go)
      Math.animation(document.documentElement.scrollTop,go,600,'Quart.easeOut', function (value) {
          document.documentElement.scrollTop = value;
      });
    }
  },

}
</script>

<style lang="scss" scoped>
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
        .date{
          color: #888;
          display: block;
        }
        .title{
          font-size: 14px;
          margin: 0 5px;
          font-weight: bold;
          color: #223253;
          transition:all .3s;
          &:hover{
            color: #7091d3;
          }
        }
        .category{
          .iconfont{
            margin: 0 6px 0 0;
          }
          .link{
            position: relative;
            border-radius: 5px;
            padding: 0 5px;
            background-color: #9e9d9d;
            color: #fff;
            transition:all .3s;
            margin-right: 5px;
            &:hover{
              background-color: #b6b6b9;
            }
          }
        }
      }
    }
  }
@media (min-width: 768px) {//pc
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
          top: 12px;
        }
        .date{
          display: inline;
        }
        .title{
          font-size: 16px;
        }
      }
    }
  }
}
</style>
