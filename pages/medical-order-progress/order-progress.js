Page({
  data: {
    orderCode: '324354363',
    status: '2',
    progress: [{
      id: 1,
      name: '创建订单',
      time: '2019-06-12 14:29',
    }, {
      id: 2,
      name: '确认订单',
      time: '2019-06-12 14:29'
    }, {
      id: 3,
      name: '开始配送',
      time: '2019-06-12 14:29'
    }, {
      id: 4,
      name: '完成',
      time: '2019-06-12 14:29'
    }]
  },
  onLoad: function () {
    // const { id = '' } = getQuery();
    // this.setData({
    //   id: id,
    // });
    //
    // getOrderDetail(id).then((result)=>{
    //   const { code, data = [], message } = result;
    //   if (code !== 1) {
    //     throw new Error(message || '请求错误');
    //   }
    //   this.setData({
    //     order: data,
    //   })
    // })
  },
})
