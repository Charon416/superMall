<template>
  <div class="cart-bottom-bar">
    <div class="check-content">
      <check-button 
        class="check-button"
        :is-checked="isSelectAll"
        @click.native="checkClick">
      </check-button>
      <span>全选</span>
    </div>

    <div class="price">
      合计：￥{{totalPrice}}
    </div>

    <div class="calculate">
      结算({{checkLength}})
    </div>
    
    
  </div>
  
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'
  export default {
    name:'CartBottomBar',
    components:{
      CheckButton
    },
    computed:{
      
      totalPrice(){
        return this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue,item) => {
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      checkLength(){
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll(){
        if(this.$store.state.cartList.length === 0) return false
        return !(this.$store.state.cartList.filter(item => !item.checked).length)
        // return !this.$store.state.cartList.find(item => !item.checked)

      }

    },
    methods:{
      checkClick(){
        if(this.isSelectAll){
          this.$store.state.cartList.forEach(item  => item.checked = false )
        }else{
          this.$store.state.cartList.forEach(item  => item.checked = true )

        }
        // this.$store.state.cartList.forEach(item => item.checked = !this.isSelectAll)还是有问题的
      }
    }


  }
</script>

<style scoped>
  .cart-bottom-bar{
    position: fixed;
    right: 0;
    left: 0;
    bottom: 49px;

    display: flex;
  
    height: 40px;
    line-height: 40px;
    background-color: #eee;


    
    
  }
  .check-content{
    width: 70px;
    height: 40px;
    display: flex;
    align-items: center;
    /* justify-content: center; */
    margin-left: 10px;
    
   
    
  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 10px;
  }
  .price{
    margin-left: 30px;
    flex: 1;
  }

  .calculate{
    width: 90px;
    color: #fff;
    background-color:red ;
    text-align: center;
  }

</style>