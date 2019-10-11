import computedBehavior from 'miniprogram-computed';

Component({
  behaviors: [computedBehavior],
  properties: {
    addresses: {
      type: Array,
      value: []
    },
    selectedAddressId: {
      type: String,
      value: ''
    }
  },
  computed: {
    newAddresses(){
      return this.data.addresses;
    },
  },
  methods: {
    addressChange($event){
      const { id } = $event.currentTarget.dataset;
      this.triggerEvent('addressChange', { id }, $event)
    },
    deleteAddress($event){
      const { id } = $event.currentTarget.dataset;
      this.triggerEvent('delete', { id }, $event);
    }
  }
})
