<template>
   <div id="home">
      <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      <homeSwiper :banners="banners"></homeSwiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" class="tab-control"></tab-control>
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
        <li>序号51</li>
        <li>序号52</li>
        <li>序号53</li>
        <li>序号54</li>
        <li>序号55</li>
        <li>序号56</li>
        <li>序号57</li>
        <li>序号58</li>
        <li>序号59</li>
        <li>序号60</li>
        <li>序号61</li>
        <li>序号62</li>
        <li>序号63</li>
        <li>序号64</li>
        <li>序号65</li>
        <li>序号66</li>
        <li>序号67</li>
        <li>序号68</li>
        <li>序号69</li>
        <li>序号70</li>
        <li>序号71</li>
        <li>序号72</li>
        <li>序号73</li>
        <li>序号74</li>
        <li>序号75</li>
        <li>序号76</li>
        <li>序号77</li>
        <li>序号78</li>
        <li>序号79</li>
        <li>序号80</li>
        <li>序号81</li>
        <li>序号82</li>
        <li>序号83</li>
        <li>序号84</li>
        <li>序号85</li>
        <li>序号86</li>
        <li>序号87</li>
        <li>序号88</li>
        <li>序号89</li>
        <li>序号90</li>
        <li>序号91</li>
        <li>序号92</li>
        <li>序号93</li>
        <li>序号94</li>
        <li>序号95</li>
        <li>序号96</li>
        <li>序号97</li>
        <li>序号98</li>
        <li>序号99</li>
        <li>序号100</li>
      </ul>
   </div>
</template>

<script>
//子组件
import HomeSwiper from "./childcomps/HomeSwiper"
import RecommendView from "./childcomps/RecommendView"
import FeatureView from "./childcomps/FeatureView"

//公共组件
import NavBar from "components/common/navbar/NavBar"
import TabControl from "components/content/tabcontrol/TabControl"




import {getHomeMultidata} from "network/home"



  export default {
    name: "Home",
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl
    },
    data(){
  
      return {
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0, list:[]},
          'news':{page:0, list:[]},
          'sell':{page:0, list:[]},
        }
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

  }

</style>