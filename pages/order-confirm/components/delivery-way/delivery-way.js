import computedBehavior from 'miniprogram-computed';

Component({
  behaviors: [computedBehavior],
  properties: {
    deliveryWays: {
      type: Array,
      value: []
    },
    deliveryId: {
      type: String,
      value: ''
    }
  },
  computed: {
    selectedDeliveryIndex(){
      const index = this.data.deliveryWays.findIndex((item)=>{
        return item.id === this.data.deliveryId;
      });

      console.log('this.data.deliveryWays:', this.data.deliveryWays);
      return index !== -1 ? index : 0;
    },
  },
  methods: {
    deliveryWayChange($event){
      const { value } = $event.detail;
      const { id } = this.data.deliveryWays[value] || {};
      this.triggerEvent('deliverywaychange', {
        deliveryId: id
      })
    }
  }
})
