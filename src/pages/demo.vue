<template>
  <div class="page">
    <div class="wrapper">
      <el-row>
        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" v-for="item in items" :key="item.id">
          <div class="card">
            <img class="pic" :src="item.pic" />
            <div class="text">
              <p class="title">{{item.title}}</p>
              <p class="gist">{{item.gist}}</p>
              <a class="view" :href="item.file" target="_blank"></a>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// import List from "../components/list"
import {webUrl} from "../../static/js/public.js"

export default {
  data(){
    return{
      items:[]
    }
  },
  created(){
    this.$axios.post(webUrl+'demoList')
      .then((res)=>{
        this.items=res.data;
      })
  }
}
</script>

<style lang="scss" scoped>
.card{
		width: 380px;
    height: 300px;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
    margin: 0 auto 20px;
	  background: linear-gradient(-45deg, #000 0%,#fff 100%);
    .pic{
      width: 390px;
      height: 310px;
      transition: all .3s;
      opacity: 0.9;
    }
    .text{
      color:#fff;
      padding: 30px;
      transition: all .3s;
      position: absolute;
      left: 0;
      right: 0;
      top:0;
      bottom: 0;
      &::before {
          position: absolute;
          right: -68px;
          bottom: -82px;
          width: 250px;
          height: 250px;
          border: 2px solid #fff;
          border-radius: 50%;
          box-shadow: 0 0 0 900px rgba(255,255,255,0.2);
          content: '';
          opacity: 0;
          transition: all .3s;
          transform: scale3d(0.5,0.5,1);
          transform-origin: 50% 50%;
      }
      .title{
        font-size: 28px;
        transition: all .3s;        
      }
      .gist{   
        position: absolute;
        right: -8px;
        bottom: 8px;
        padding: 0 1.5em 1.5em 0;
        width: 140px;
        text-align: right;
        opacity: 0;
        transform: translate3d(20px,20px,0);
        transition: all .3s;
      }
      .view{
        padding: 30px;
        transition: all .3s;
        position: absolute;
        left: 0;
        right: 0;
        top:0;
        bottom: 0;
      }
    }
    &:hover{
      .text::before {
        opacity: 1;
        transform: scale3d(1,1,1);
      }
      .pic{
        opacity: .6;
        transform: translate3d(-10px,-10px,0);
      }
      .text{
        transform: translate3d(-10px,-10px,0);
      }
      .title{
        transform: translate3d(5px,5px,0);
      }
      .gist{
        opacity: 1;
        transform: translate3d(0,0,0);
      }
    }
}
	

@media (min-width: 768px) { //pc
// .card{
// 		width: 300px;height: 300px;position: relative;overflow: hidden;
// 	  background: linear-gradient(-45deg, #000 0%,#fff 100%);
//     .txt{
//       color:#fff;
//       padding: 30px;
//       transition: all .3s;
//       position: absolute;
//       left: 0;
//       right: 0;
//       top:0;
//       bottom: 0;
//       &::before {
//           position: absolute;
//           right: -100px;
//           bottom: -100px;
//           width: 300px;
//           height: 300px;
//           border: 2px solid #fff;
//           border-radius: 50%;
//           box-shadow: 0 0 0 900px rgba(255,255,255,0.2);
//           content: '';
//           opacity: 0;
//           transition: all .3s;
//           transform: scale3d(0.5,0.5,1);
//           transform-origin: 50% 50%;
//       }
//       .pic{
//         width: 310px;
//         height: 310px;
//         transition: all .3s;
//         opacity: 0.9;
//       }
//       .gist{   
//         color: #fff;
//         position: absolute;
//         right: 0;
//         bottom: 0;
//         padding: 0 1.5em 1.5em 0;
//         width: 140px;
//         text-align: right;
//         opacity: 0;
//         transform: translate3d(20px,20px,0);
//         transition: all .3s;
//       }
//       .view{
//         color:#fff;
//         padding: 30px;
//         transition: all .3s;
//         position: absolute;
//         left: 0;
//         right: 0;
//         top:0;
//         bottom: 0;
//       }
//     }
//     &:hover{
//       .text::before {
//         opacity: 1;
//         transform: scale3d(1,1,1);
//       }
//       .pic{
//         opacity: .6;
//         transform: translate3d(-10px,-10px,0);
//       }
//       .text{
//         transform: translate3d(-10px,-10px,0);
//       }
//       .gist{
//         opacity: 1;
//         transform: translate3d(0,0,0);
//       }
//     }
// }
}
</style>
