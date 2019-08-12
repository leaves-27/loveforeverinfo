import qs from "qs";

Page({
  data: {
    good: {
      id: '11',
      name: 'xxx',
      price: 'xx'
    }
  },
  goConfirmPay($event) {
    const { item } = $event.currentTarget.dataset;
    const { id } = item;

    const query = {
      id
    };
    wx.navigateTo({
      url: `../order-confirm/order-confirm?$${qs.stringify(query)}`
    })
  },
  onLoad: function () {

  }
})
