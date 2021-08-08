<template>
   <div id="home" class="wrapper">

    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <tab-control 
      :titles="['流行','新款','精选']" 
        
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"></tab-control>


    <scroll 
        class="content" 
        ref="scroll" 
        :probe-type="3" 
        @scroll="contentScroll" 
        :pull-up-load="true"
        @pullingUp="loadMore">
      <homeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad"></homeSwiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control 
        :titles="['流行','新款','精选']" 
        
        @tabClick="tabClick"
        ref="tabControl"></tab-control>
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
import {debounce} from "common/utils.js"






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
      BackTop,
      debounce
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
        isShowBackTop:true,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0
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
    mounted(){
      // 监听图片加载完成
      const refresh = debounce(this.$refs.scroll.refresh,50)
      this.$bus.$on('itemImageLoad',() => {
        refresh()
      })

      // 2,获取tabControl的offersettOP

      
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      },
      activated(){
        // console.log('activated');
        this.$refs.scroll.scrollTo(0,this,saveY,0)
        this.$refs.scroll.refresh()
      },
      deactivated(){
        // console.log('deactivated');
        this.saveY=this.$refs.scroll.getScrollY()
      }
    },
    methods:{
     /* 事件监听相关的 */
      tabClick(index){
        console.log(this.tabOffsetTop);
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
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl.currentIndex = index
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0)

      },
      contentScroll(position){
        //判断返回顶部是否显示
        this.isShowBackTop = (-position.y) > 1000
        //判断tabControl是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
        


      },
      loadMore(){
        this.getHomeGoods(this.currentType)
        //重新计算高度
        this.$refs.scroll.scroll.refresh()

      },
      swiperImageLoad(){
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop

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
    /* position: fixed; 
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  .tab-control{
    position: relative;
    /* top: 44px; */
    z-index: 9;

  }





  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }


</style>