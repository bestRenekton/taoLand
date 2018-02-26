<template>
  <div class="content">
    <ul>
      <li v-for="(li) in items" :key="li.id">
        <!-- <a :href="'#anchor-'+li.type" class="title">{{li.type}} ( {{li.list.length}} )</a> -->
        <a href="javascript:;" @click="anchor(li.type)" class="title">{{li.type}} ( {{li.list.length}} )</a>
        </li>
    </ul>
  </div>
</template>

<script>
import {anchor} from '../../static/js/public.js'

export default {
  mixins: [anchor],
  data(){
    return{
      // list:[]
    }
  },
  methods:{
    // anchor:function(e){
    //   let id='anchor-'+e;
    //   let anchor=document.getElementById(id);
    //   let go=anchor.offsetTop;

    //   // console.log(go)
    //   Math.animation(document.documentElement.scrollTop,go,600,'Quart.easeOut', function (value) {
    //       document.documentElement.scrollTop = value;
    //   });
    // }
  },
  props: ['items']   /*  props是子组件获取父组件数据用的 */
}
</script>

<style lang="scss" scoped>
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
</style>
