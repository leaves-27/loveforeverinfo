import computedBehavior from 'miniprogram-computed';

Component({
  behaviors: [computedBehavior],
  properties: {
    orders: {
      type: Array,
      value: []
    },
    selectedTabId: {
      type: String,
      value: ''
    }
  },
  computed: {
    newOrders(){
      // const orders = [];
      // if (this.data.selectedTabId === '0'){
      //   orders.push(...this.data.orders);
      // } else {
      //   this.data.orders.forEach((item)=>{
      //     if(this.data.selectedTabId === item.status){
      //       orders.push(item);
      //     }
      //   })
      // }
      // 1.按照同一天同一件商品的进行分类;
      //   计算同一天同一件商品的销量和销售总额

      // 2.按照同一天同一个人进行分类:
      //

      return this.data.orders;
    },
  }
})
