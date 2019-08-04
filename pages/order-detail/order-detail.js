// import getOrderDetail from '../../apis/getOrderDetail.js';
import getOrderDetail from "../../mock/getOrderDetail";
import { placeholderUrl, getQuery, goPay } from '../../utils/util';

Page({
  data: {
    user: {},
    good: {},
    order: {},
    waitPayIconUrl: '../../images/icon--wait-pay.png',
    iconAddressUrl: placeholderUrl
  },
  onLoad: function () {
    const { id = '0' } = getQuery();
    this.setData({
      id: id,
    });

    getOrderDetail(id).then((result)=>{
      const { code, data = [], message } = result;
      if (code !== 1) {
        throw new Error(message || '请求错误');
      }
      const { user = {}, good = {}, order = {} } = data;

      this.setData({
        user,
        good,
        order
      })
    })
  },
  methods: {
    goPay,
    goBuy(){

    },
    goDeliveryDetail(){

    }
  }
})
