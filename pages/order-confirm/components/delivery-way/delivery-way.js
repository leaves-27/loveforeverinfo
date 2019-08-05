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
      const index = this.deliveryWays.findIndex((item)=>{
        return item.id === this.data.deliveryId;
      });
      return index !== -1 ? index : 0;
    },
  },
  methods: {
    deliveryWayChange($event){
      const { value } = $event.detail;
      const { id } = this.deliveryWays[value] || {};
      this.triggerEvent('deliverywaychange', {
        deliveryId: id
      })
    }
  }
})
