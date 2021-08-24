import {debounce} from "common/utils.js"
import BackTop from "components/content/backTop/BackTop"

export const itemListenerMixin = {
  data(){
    return {
      itemImgListener:null
    }
  },
  mounted(){
    let newRefresh = debounce(this.$refs.scroll.refresh,100)
    this.itemImgListener = () => {
      newRefresh()
    }
    this.$bus.$on('itemImgLoad',this.itemImgListener)
    // console.log('wdnmd');
  }
}


export const backTopMixin = {
  data(){
    return {
      isShowBackTop:false
    }
  },
  components:{
    BackTop
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    demo(position){
      this.isShowBackTop = (-position.y) > 1000
    }
  }
}