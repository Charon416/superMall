import Toast from "./Toast"

const obj = {}

obj.install = function(Vue){
  // console.log(Toast.$el); 结果为undefined
  // document.body.appendChild(Toast.$el)

  // 1，创建组件构造器
  const toastcontructor = Vue.extend(Toast)

  // 2,new 的方式，根据组件构造器，可以创建出来一个组价对象
  const toast = new toastcontructor()

  // 3,将组件对象手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))

  // 4,toast.$el对应的就是div
  document.body.appendChild(toast.$el)


  Vue.prototype.$toast = toast;
  
}
export default obj