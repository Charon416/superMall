<template>
  <div>
    <scroll class="content">
      <ul>
        <li>标签1</li>
        <li>标签2</li>
        <li>标签3</li>
        <li>标签4</li>
        <li>标签5</li>
        <li>标签6</li>
        <li>标签7</li>
        <li>标签8</li>
        <li>标签9</li>
        <li>标签10</li>
        <li>标签11</li>
        <li>标签12</li>
        <li>标签13</li>
        <li>标签14</li>
        <li>标签15</li>
        <li>标签16</li>
        <li>标签17</li>
        <li>标签18</li>
        <li>标签19</li>
        <li>标签20</li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'

  export default {
    name: "Profile",
    components:{
      Scroll

    }
  }
</script>

<style scoped>
  .content{
    background-color: skyblue;
    height: 300px;
    overflow: hidden;
  }

</style>