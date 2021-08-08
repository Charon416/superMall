<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    
    
  </div>
</template>

<script>
// import NavBar from "components/common/navbar/NavBar"
import DetailNavBar from "views/detail/childComps/DetailNavBar"

import {getDetail} from "network/detail"




  export default {
    name:'Detail',
    data(){
      return {
        iid:null,
        topImages:[]
      }
    },
    components:{
      // NavBar
      DetailNavBar,
      // getDetail

    },
    created(){
      //保存传入的iid
      
      this.iid=this.$route.params.iid

      //根据iid请求详情数据
      getDetail(this.iid).then(res => {
        //获取顶部的轮播图片
        console.log(res);
        // this.topImages=res.result.itemInfo.topImages
      })
    }
  }
</script>

<style scoped>

</style>