<template>
  <div class="menu-list">
    <div class="menu-list-item"
          :class="{active: index===currentIndex}"
          v-for="(item, index) in categories"
          :key="index"
          @click="itemClick(index)">
      {{item.title}}
    </div>
  </div>
</template>

<script>
  export default {
    name:'TabMenu',
    data(){

    },
    props:{
      categories:{
        type:Array,
        default(){
          return []
        }
      }
        
    }
  }

  
</script>

<style>

</style>