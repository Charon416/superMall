<template>
   <div id="home">
      <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

      <scroll class="content">
        <homeSwiper :banners="banners"></homeSwiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control 
          :titles="['流行','新款','精选']" 
          class="tab-control"
          @tabClick="tabClick"></tab-control>
        <goods-list :goods="showGoods"></goods-list>
      </scroll>



      <ul>
        <li>序号1</li>
        <li>序号2</li>
        <li>序号3</li>
        <li>序号4</li>
        <li>序号5</li>
        <li>序号6</li>
        <li>序号7</li>
        <li>序号8</li>
        <li>序号9</li>
        <li>序号10</li>
        <li>序号11</li>
        <li>序号12</li>
        <li>序号13</li>
        <li>序号14</li>
        <li>序号15</li>
        <li>序号16</li>
        <li>序号17</li>
        <li>序号18</li>
        <li>序号19</li>
        <li>序号20</li>
        <li>序号21</li>
        <li>序号22</li>
        <li>序号23</li>
        <li>序号24</li>
        <li>序号25</li>
        <li>序号26</li>
        <li>序号27</li>
        <li>序号28</li>
        <li>序号29</li>
        <li>序号30</li>
        <li>序号31</li>
        <li>序号32</li>
        <li>序号33</li>
        <li>序号34</li>
        <li>序号35</li>
        <li>序号36</li>
        <li>序号37</li>
        <li>序号38</li>
        <li>序号39</li>
        <li>序号40</li>
        <li>序号41</li>
        <li>序号42</li>
        <li>序号43</li>
        <li>序号44</li>
        <li>序号45</li>
        <li>序号46</li>
        <li>序号47</li>
        <li>序号48</li>
        <li>序号49</li>
        <li>序号50</li>

      </ul>


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
      Scroll
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
        currentType:'pop'
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

          console.log(res);
          // this.$set(this.goods[type].list,res.data.list)

          this.goods[type].list.push(...res.data.list);
          // console.log(res.data.list);

          this.goods[type].page += 1;
          // console.log(this.goods[type].page);

        })
      }



    }


  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
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
  .content{
    /* color: skyblue; */
    height: 300px;
    /* overflow: hidden; */
  }

</style>