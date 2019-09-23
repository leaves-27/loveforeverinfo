import computedBehavior from 'miniprogram-computed';
import { staticPrefix } from '../../../../config/index'
import {OrderStatus, router} from "../../../../utils/util";

Component({
  behaviors: [computedBehavior],
  properties: {
    status: {
      type: String,
      value: ''
    }
  },
  data: {
    OrderStatus,
  },
  computed: {
    result(){
      let iconUrl,
          title,
          desc;

      switch(this.data.status){
        case OrderStatus['payed']:
          iconUrl = `${staticPrefix}/status_success.png`;
          title = '下单成功';
          desc = '请耐心等待销售代表确认';
          break;

        default:
          iconUrl = `${staticPrefix}/status_failure.png`;
          title = '支付失败';
          desc = '请耐心等待销售代表确认';
      }

      return {
        iconUrl,
        title,
        desc
      }
    },
  },
  methods: {
    repay(){
      router.redirectTo({
        url: `/pages/my-order/my-order`
      });
    },
    rebuy(){
      router.redirectTo({
        url: `/pages/index/index`
      });
    }
  }
});
