<template>
<!-- ref绑定给自组件 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
  
</template>

<script scoped>
  import BScroll from 'better-scroll'
  export default {
    name:'Scroll',
    props:{
      probeType:{
        type: Number,
        default: 0
      }
      
    },
    data(){
      return {
        scroll:null,
 
      }

    },
    mounted(){
      // 1,创建对象
      this.scroll=new BScroll(this.$refs.wrapper,{
        click:true,
        probeType:this.probeType
      })
      // 2,监听滚动的位置
      this.scroll.on('scroll',(position => {
        // console.log(position);
        //发出自定义事件
        this.$emit('scroll',position)
      }))



    },
    methods:{
      scrollTo(x,y,time=300){
        this.scroll.scrollTo(x,y,time)
      }
    }

  }
</script >

<style scoped>

</style>