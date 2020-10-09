<template>
  <div id="app">
    <app-header></app-header>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from "./components/Shared/Header.vue";
import Footer from "./components/Shared/Footer.vue";

export default {
  components: {
    appHeader: Header,
    appFooter: Footer
  },
  created() {
    this.$store.dispatch("getTradeResult");
    this.$store.dispatch("initApp");
  }
};
</script>

<style>
body{
  background-color:#e3f2fd;
}
.fade-enter{
  opacity: 0;
}
.fade-enter-active{
  transition: opacity .2s ease-out; /*opacity'i 1 yapmaya gerek yok çünkü transition da otomatik kendi yapıyor*/
}
.fade-leave{

}
.fade-leave-active{
  transition: opacity .2s ease-out;
  opacity: 0;
}
</style>
