<template>
  <div class="container">
    <common-header></common-header>
    <!-- 子路由 -->
    <transition name="slide-fade">
      <!-- <keep-alive> -->
      <router-view></router-view>
      <!-- </keep-alive> -->
    </transition>
    <common-footer></common-footer>
  </div>
</template>

<script>
import CommonHeader from "../components/commonHeader";
import CommonFooter from "../components/commonFooter";
import { checkSign } from "../../static/js/public.js";

export default {
  mixins: [checkSign],
  data() {
    return {
      items: []
    };
  },
  components: {
    CommonHeader,
    CommonFooter
  },
  mounted() {

  }
};
</script>

<style lang="css" scoped>
.container {
  width: 100%;
  margin: 0 auto;
}
.content {
  margin-bottom: 1.8rem;
}
.cont-ul {
  padding-top: 0.5rem;
  background-color: #ccc;
}
.cont-ul::after {
  content: "";
  display: block;
  clear: both;
  width: 0;
  height: 0;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
