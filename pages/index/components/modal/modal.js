import computedBehavior from "miniprogram-computed";
import {staticPrefix} from "../../../../config/index";

Component({
  behaviors: [computedBehavior],
  properties: {
    good: {
      type: Object,
      value: {}
    },
  },
  data: {
    arrowRightUrl: `${staticPrefix}/arrow_right.png`,
  },
  methods: {
    cancel(){
      this.triggerEvent('cancel');
    },
    confirm($event){
      const { id } = $event.currentTarget.dataset;
      this.triggerEvent('confirm', {
        id
      });
    }
  },
  onLoad(){

  }
});
