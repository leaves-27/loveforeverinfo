import confirmSign from "../apis/order/confirmSign";

export default function ($event, callback){
	const { id } = $event.detail;
	wx.showModal({
		content: '你确认签收吗?',
		success(){
			confirmSign({
				orderId: id
			}).then(({ code })=>{
				if (code * 1 === 1){
					wx.showToast({
						icon: 'none',
						title: '签收成功'
					});
					callback();
				} else {
					wx.showToast({
						icon: 'none',
						title: '签收失败,请稍后重试或联系客服'
					});
				}
			}).catch((error)=>{
				console.error(error);
				wx.showToast({
					icon: 'none',
					title: '签收失败,请稍后重试或联系客服'
				});
			});
		}
	})
}
