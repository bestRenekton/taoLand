<template>
  <footer>
    <div class="wrapper">
      <p>本站记录我前端之旅的沿途风景！  Contact me at: 
        <a href=""><i class="iconfont icon-github"></i></a>
        <a href=""><i class="iconfont icon-zhihu"></i></a>
      </p>
      <p>本站总访问量165349次，本站访客数66739人次，本文总阅读量6114次</p>
      <p>Site powered by Jekyll & Github Pages. Theme designed by YYT.</p>
    </div>
    <transition name="slide-fade">
      <div v-if="isTop" class="toTop iconfont icon-top" @click="toTop"></div>
    </transition>
  </footer>
</template>
<script>
export default {
  data(){
    return{
      isTop:false
    }
  },
  created(){
    window.addEventListener('scroll', this.scroll);
  },
  methods:{
    scroll:function(){
      let scroll=document.body.scrollTop || document.documentElement.scrollTop;
      if(scroll>100){
        this.isTop=true;
      }else{
        this.isTop=false;        
      }
    },
    toTop:function(){
      //Math.animation = function (from, to, duration, easing, callback) {}
      Math.animation(document.documentElement.scrollTop, 0,600,'Quart.easeOut', function (value) {
          document.documentElement.scrollTop = value;
      });
    }
  }
}
</script>

<style lang="scss" scoped>
footer{
  background:#2d2d2d;
  color: #bbb;
  box-shadow: 0 -2px 4px 1px rgba(0, 0, 0, 0.5);
  margin-top: 20px;
  padding: 10px 0;
  text-align: center;
  .wrapper .iconfont{
    color: #bbb;
    font-size:20px;
    margin:0 5px;
    &:hover{
      color: #fff;
    }
  }
  .toTop{
    position: fixed;
    right: 20px;
    bottom: 150px;
    font-size: 40px;
    color: #666;
    cursor: pointer;
    z-index: 9999;
    &:hover{
      color: #333;
    }
  }
  .slide-fade-enter-active,.slide-fade-leave-active{
    transition: all .3s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to{
    transform: translateY(10px);
    opacity: 0;
  }
}


@media (min-width: 768px) {//pc
  footer{
    margin-top: 80px;
    padding: 15px 0;
    .wrapper .iconfont{
      font-size:20px;
    }
    .toTop{
      position: fixed;
      right: 50%;
      bottom: 50px;
      margin-right: -690px;
      font-size: 40px;
      color: #666;
      cursor: pointer;
      z-index: 9999;
      &:hover{
        color: #999;
      }
    }
  }
}
</style>
