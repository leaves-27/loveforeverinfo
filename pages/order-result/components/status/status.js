import computedBehavior from 'miniprogram-computed';

Component({
  behaviors: [computedBehavior],
  properties: {
    statusId: {
      type: String,
      value: ''
    }
  },
  computed: {
    status(){
      let iconUrl,
          title,
          desc;

      switch(this.data.statusId){
        case '1':
          iconUrl = '../../../../images/status_success.png';
          title = '下单成功';
          desc = '请耐心等待销售代表确认';
          break;

        case '2':
          iconUrl = '../../../../images/status_wait.png';
          title = '处理中';
          desc = '请耐心等待销售代表确认';
          break;

        default:
          iconUrl = '../../../../images/status_failure.png';
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
  methods: {}
});
