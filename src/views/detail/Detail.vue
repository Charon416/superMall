<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>

    <scroll class="content"
            ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
      <goods-list :goods="recommends"></goods-list>
    
    </scroll>

    
  </div>
</template>

<script>

import DetailNavBar from "./childComps/DetailNavBar"
import DetailSwiper from "./childComps/DetailSwiper.vue"
import DetailBaseInfo from "./childComps/DetailBaseinfo.vue"
import DetailShopInfo from "./childComps/DetailShopinfo.vue"
import DetailGoodsInfo from "./childComps/DetailGoodsinfo.vue"
import DetailParamInfo from "./childComps/DetailParaminfo.vue"
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue"

import Scroll from "components/common/scroll/Scroll"
import GoodsList from "components/content/goods/GoodsList"



import {getDetail,getRecommend,Goods,Shop,GoodsParam} from "network/detail"

import {itemListenerMixin} from "common/mixin.js" 




  export default {
    name:'Detail',
    data(){
      return {
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[]

      }
    },
    mixins:[itemListenerMixin],
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList

    },
    created(){
      //保存传入的iid
      
      this.iid=this.$route.params.iid


      //2,根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        const data = res.result;
        //获取顶部的轮播图片
        this.topImages=data.itemInfo.topImages;
        // 2.3.获取商品信息
        
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
        // 2.4.获取店铺信息
        this.shop = new Shop(data.shopInfo);

        // 2.5.获取商品信息
        this.detailInfo = data.detailInfo

        // 2.6.保存参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

        //2.7.取出评论的信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }
      
      })


      //3，请求推荐数据
      getRecommend().then(res => {
        // console.log(res);
        this.recommends = res.data.list
      })


    },
    mounted(){
      // const refresh = debounce(this.$refs.scroll.refresh,50)
      // this.$bus.$on('itemImageLoad',() => {
      //   refresh()
      // })



    },
    destroyed(){
      this.$bus.$off('itemImgLoad',this.itemImgListener)
      

    },
    methods:{
      imageLoad(){
        this.$refs.scroll.refresh()
      }

    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content{
    height: calc(100% - 44px);
  }

</style>