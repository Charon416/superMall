<template>
   <div id="home">
      <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      <homeSwiper :banners="banners"></homeSwiper>
      <recommend-view :recommends="recommends"></recommend-view>
   </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import HomeSwiper from "./childcomps/HomeSwiper"
import RecommendView from "./childcomps/RecommendView"




import {getHomeMultidata} from "network/home"
  export default {
    name: "Home",
    components:{
      NavBar,
      HomeSwiper,
      RecommendView
    },
    data(){
  
      return {
        banners:[],
        recommends:[]
      }
    },
    created(){
      getHomeMultidata().then((res) => {
        // console.log(res);
        
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        
      })
    }
  }
</script>

<style scoped>  
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /* position: fixed; */
    /* left: 0; */
    /* right: 0; */
    /* top: 0; */
    /* z-index: 9; */
  }

</style>