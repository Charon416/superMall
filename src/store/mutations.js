import { ADD_COUNTER,ADD_TO_CART } from "./mutations-types"




export default {
  // mutations 唯一目的就是修改state的状态,操作可跟踪
  //mutations 中的每个方法完成的事情比较单一
  // addCart(state,payload){
  //数组常用的方法有哪些：push/pop/unshift/shift/sort/reverse/map/filter/reduce/splice/join
  // payload新添加的商品
  [ADD_COUNTER](state,payload){
    payload.count++
  },
  [ADD_TO_CART](state,payload){
    payload.checked=true
    state.cartList.push(payload)
  }
}