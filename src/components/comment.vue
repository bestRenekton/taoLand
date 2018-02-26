<template>
  <div class="page">
      <div id="SOHUCS"></div>
  </div>
</template>

<script>
import '../../static/js/changyan.js'

export default {
  data(){
    return{
      // items:[]
    }
  },
  created(){
     window.changyan.api.config({
      appid: 'cytu1EELV',
      conf: 'prod_201c85b98ac4f4d53e714c7c7e6676ed'
    });
  }
}
</script>

<style lang="scss" scoped>

</style>
