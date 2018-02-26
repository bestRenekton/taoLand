<template>
<div>
  <div class="card" v-for="(item) in items" :key="item.id">
    <router-link :to="'/detail/'+item._id">
      <p class="card_title">{{item.title}}</p>
      <p class="gist">{{item.gist}}</p>
    </router-link>
    <p class="date">{{item.date}}</p>
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
  props: ['items'],  
  methods:{
    // goCategory:function(e){
    //   this.$store.commit('changeIndex','3')
    //   this.$router.push({ path: '/categories'+e})
    // }
  },
}
</script>

<style lang="scss" scoped>
  .card{
    margin: 10px 0 0 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    .card_title{
      font-size: 18px;
      font-weight: 600;
      color: #0085A1;
    }
    .gist{
      transition: all .3s;
      font-style: italic;
      color:#a3a3a3;
      margin: 5px 0;
      &:hover{
        color: #0085a1;
      }
    }
    .date{
      font-style: italic;
      font-family: Lora,'Times New Roman',serif;
      color: #808080;
    }
  }
@media (min-width: 768px) {//pc
  .card{
    padding-bottom: 20px;
    .card_title{
      font-size: 26px;
    }
    .gist{
      margin: 10px 0;
    }
  }
}
</style>
