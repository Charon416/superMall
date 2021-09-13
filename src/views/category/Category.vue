<template>
  <Cate-Gory-Nav-Bar class="cate-nav"></Cate-Gory-Nav-Bar>



</template>

<script>
  import CateGoryNavBar from './childComps/CateGoryNavBar.vue'
  import BScroll from 'better-scroll'
  export default {
    name: "Category",
    components:{
      CateGoryNavBar
    },
    data(){
      return {
        scroll:null,
        categories:[],
        categoryDate:{}

      }
    },
    created(){
      // 1，请求分类的数据
      this._getCategory()
    },
    
    mounted(){
      // console.log(document.querySelector('.content'));
      this.scroll = new BScroll(document.querySelector('.wrapper'),{
        probeType:3,
        pullUpLoad:true,
        // click:true


      })
      this.scroll.on('scroll',(position) => {
        // console.log(position);
      })

      this.scroll.on('pullingUp',() => {
        console.log('上拉加载更多');
      })
      // new BScroll('.content',{

      // })
    },
    methods:{
      btnClick(){
        console.log('btnyyds');
      },
      _getCategory(){
        getCategory().then(res => {
          // 1,获取分类数据
          // this.categories = res.data.category.list
          console.log(res);
        })

      }
    }
  }
</script>

<style scoped>
  .cate-nav{
    background-color: var(--color-tint);
    color: #fff;

  }

</style>