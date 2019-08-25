import computedBehavior from "miniprogram-computed";
import {staticPrifix} from "../../../../config/index";

Component({
  behaviors: [computedBehavior],
  properties: {
    good: {
      type: Object,
      value: {}
    },
  },
  data: {
    arrowRightUrl: `${staticPrifix}/arrow_right.png`,
  },
  computed: {
    goods(){
      const { suites = [] } = this.data.good;
      return suites.map((item)=>{
        return {
          id: this.data.good.id,
          name: this.data.good.name,
          logoUrl: this.data.good.logoUrl,
          count: item
        }
      });
    }
  },
  methods: {
    cancel(){
      this.triggerEvent('cancel');
    },
    confirm($event){
      const { id, count } = $event.currentTarget.dataset;
      this.triggerEvent('confirm', {
        id,
        count
      });
    }
  },
  onLoad(){

  }
});
