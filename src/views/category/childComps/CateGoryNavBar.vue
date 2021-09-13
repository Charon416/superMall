<template>
  <div>
    <nav-bar>
      <div slot="center">
        {{title}}
      </div>

    </nav-bar>

  </div>
  
</template>

<script>

import NavBar from "components/common/navbar/NavBar"
  export default {
    name:'CateGoryNavBar',
    components:{
      NavBar
    },
    data(){
      return{
        title:'商品分类'
      }
    }

  }
</script>

<style>

</style>