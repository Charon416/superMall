<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailNavBar"></detail-nav-bar>

    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">


      <div>{{$store.state.cartList.length}}</div>


      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommends" :goods="recommends" class="goods-list" ></goods-list>

      
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

    
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
import DetailBottomBar from "./childComps/DetailBottomBar.vue"
// import BackTop from "components/content/backTop/BackTop"
import Scroll from "components/common/scroll/Scroll"
import GoodsList from "components/content/goods/GoodsList"



import {getDetail,getRecommend,Goods,Shop,GoodsParam} from "network/detail"
import {debounce} from "common/utils.js"

import {itemListenerMixin,backTopMixin} from "common/mixin.js" 




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
        recommends:[],
        themeTopY:[],
        getThemeTopY:null,
        currentIndex:0,


      }
    },
    mixins:[itemListenerMixin,backTopMixin],
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      // BackTop

    },
    created(){
      //1,保存传入的iid
      
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

        //第一次获取，值不对
        //原因，this.$refs.params.$el.压根没有渲染
                            
        // this.themeTopY=[];
        
        // this.themeTopY.push(0);
        // this.themeTopY.push(this.$refs.params.$el.offsetTop);
        // this.themeTopY.push(this.$refs.comment.$el.offsetTop);
        // this.themeTopY.push(this.$refs.recommends.$el.offsetTop);

        // this.$nextTick( () => {
        //   //第二次渲染：值依然不对
        //   //图片没有计算在内
        //   //根据最新的数据，对应的DOM是已经渲染出来了

        //   //但是图片是没有加载完的
                    
        //   this.themeTopY=[];
          
        //   this.themeTopY.push(0);
        //   this.themeTopY.push(this.$refs.params.$el.offsetTop);
        //   this.themeTopY.push(this.$refs.comment.$el.offsetTop);
        //   this.themeTopY.push(this.$refs.recommends.$el.offsetTop);
        // })


      
      })


      //3，请求推荐数据
      getRecommend().then(res => {
        // console.log(res);
        this.recommends = res.data.list
      })

      //4，给getThemeTopY赋值
      this.getThemeTopY = debounce( () => {
                                    
        this.themeTopY=[];
        
        this.themeTopY.push(0);
        this.themeTopY.push(this.$refs.params.$el.offsetTop-44);
        this.themeTopY.push(this.$refs.comment.$el.offsetTop-44);
        this.themeTopY.push(this.$refs.recommends.$el.offsetTop-44);
        this.themeTopY.push(Number.MAX_VALUE);

        console.log(this.themeTopY);

      },100)


    },
    updated(){

    },
    mounted(){

      




    },
    destroyed(){
      this.$bus.$off('itemImgLoad',this.itemImgListener)
      

    },
    methods:{
      backClick(){
        this.$refs.scroll.scrollTo(0,0)
      },
      imageLoad(){
        this.$refs.scroll.refresh();
        this.getThemeTopY();

        
      },
      titleClick(index){
        // console.log(index);
        // console.log(this.themeTopY);
        this.$refs.scroll.scrollTo(0,-this.themeTopY[index],300)

      },
      // demo(){
      //   this.isShowBackTop = (-position.y) > 1000
      // },

      contentScroll(position){

        this.demo(position)
        
        
        //获取y的值
        const positionY = -position.y


        

        //2，positionY和主题中的值对比
        //[0,6783,7459,7791],index分别为0,1,2,3
        for(let i =0; i < this.themeTopY.length-1; i++ ){

          if(this.currentIndex !== i && (positionY >= this.themeTopY[i] && positionY < this.themeTopY[i+1])){
            this.currentIndex = i;
            this.$refs.detailNavBar.currentIndex =this.currentIndex;
          //   console.log(Number.MAX_VALUE);

          }
          




          // if(this.currentIndex != i && ((i < this.themeTopY.length-1 && positionY >= this.themeTopY[i] && positionY < this.themeTopY[i+1])|| ( i == this.themeTopY.length-1 && positionY >= this.themeTopY[i]))){
            
          //   this.currentIndex = i;
          //   this.$refs.detailNavBar.currentIndex =this.currentIndex;
    
            
          // }
        }


      },
      addToCart(){
        // console.log('------------');
        // 1,获取购物车需要的信息
        const product = {}
        product.image=this.topImages[1];
        product.title=this.goods.title;
        product.desc=this.goods.desc;
        product.iid = this.iid;
        product.price = this.goods.nowPrice;
        console.log(product);
        // 2，将商品添加到购物车

        // this.$store.commit('addCart',product)//mulations调用方法
        this.$store.dispatch('addCart',product)
        console.log(this.$store.state.cartList);


        // this.$store.cateList.push(product);
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
    position: absolute;
    top: 44px;
    bottom: 60px;

  }


</style>