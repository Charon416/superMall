<template>
   <div id="home" class="wrapper">

    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>


    <scroll 
        class="content" 
        ref="scroll" 
        :probe-type="3" 
        @scroll="contentScroll" 
        :pull-up-load="true"
        @pullingUp="loadMore">
      <homeSwiper :banners="banners"></homeSwiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control 
        :titles="['流行','新款','精选']" 
        class="tab-control"
        @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>




   </div>
</template>

<script>
//子组件
import HomeSwiper from "./childcomps/HomeSwiper"
import RecommendView from "./childcomps/RecommendView"
import FeatureView from "./childcomps/FeatureView"
import GoodsList from "components/content/goods/GoodsList"

//公共组件
import NavBar from "components/common/navbar/NavBar"
import TabControl from "components/content/tabcontrol/TabControl"
import Scroll from "components/common/scroll/Scroll"
import BackTop from "components/content/backTop/BackTop"



// 导入方法
import {
  getHomeMultidata,
  getHomeGoods
} from "network/home"






  export default {
    name: "Home",
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,
      GoodsList,
      NavBar,
      TabControl,
      Scroll,
      BackTop
    },
    data(){
      return {
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0, list:[]},
          'new':{page:0, list:[]},
          'sell':{page:0, list:[]},
        },
        currentType:'pop',
        isShowBackTop:'true'
      }
    },
    created(){
      //请求多个数据
      this.getHomeMultidata()

      //请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    computed:{
      showGoods(){
        
        return this.goods[this.currentType].list
      }
    },
    methods:{

     /* 事件监听相关的 */
      tabClick(index){
        console.log(index);
        switch (index){
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0)

      },
      contentScroll(position){
        this.isShowBackTop = (-position.y) > 1000

      },
      loadMore(){
        this.getHomeGoods(this.currentType)
        //重新计算高度
        this.$refs.scroll.scroll.refresh()
        // console.log(this.currentType);
        // console.log('aaaaaaaaaaaa');

      },

      /* 网络请求相关的方法 */
      getHomeMultidata(){
        getHomeMultidata().then((res) => {

          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
      
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then((res) => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;


          this.$refs.scroll.finishPullUp()

        })
      }




    }


  }
</script>

<style scoped>
  #home{
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
    
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed; 
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control{
    position: sticky;
    top: 44px;
    z-index: 9;

  }

  /* .content{
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */



  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }


</style>