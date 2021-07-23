<template>
<!-- ref绑定给自组件 -->
  <div class="wrapper" ref="wrapper">
    <div class="cotent">
      <slot></slot>
    </div>
  </div>
  
</template>

<script scoped>
  import BScroll from 'better-scroll'
  export default {
    name:'Scroll',
    data(){
      return {
        scroll:null
      }

    },
    mouted(){
      this.scroll=new BScroll(this.$refs.wrapper,{

      })

    }

  }
</script scoped>

<style>

</style>