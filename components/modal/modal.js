// import qs from "qs";
// import computedBehavior from 'miniprogram-computed';

Component({
  properties: {
    isShow: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    hide(){
      this.triggerEvent('hide');
    }
  }
})
