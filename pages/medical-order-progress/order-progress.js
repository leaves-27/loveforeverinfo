import { getQuery } from '../../utils/util';
import getOrderDetail from "../../mock/getOrderDetail";

Page({
  data: {
    order: null,
  },
  onLoad: function () {
    const { id = '' } = getQuery();
    this.setData({
      id: id,
    });

    getOrderDetail(id).then((result)=>{
      const { code, data = null, message } = result;
      if (code !== 1) {
        throw new Error(message || '请求错误');
      }

      console.log('test:', data);
      this.setData({
        order: data,
      })
    })
  },
})