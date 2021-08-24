import { ADD_COUNTER, ADD_TO_CART } from "./mutations-types"



export default{
  addCart(context,payload){
    // payload新添加的商品


    // let oldProduct = null;
    // for(let item of state.cartList){
    //   if(item.iid == payload.iid){
    //     oldProduct = item;
    //   }
    // }

    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)


    // 判断oldProduct是否有值

    if(oldProduct){
      // oldProduct.count += 1
      context.commit(ADD_COUNTER,oldProduct)
    }else{
      payload.count = 1
      // context.state.cartList.push(payload) 
      context.commit(ADD_TO_CART,payload)
    }



  /*   // state.cartList.push(payload) */

  }
}