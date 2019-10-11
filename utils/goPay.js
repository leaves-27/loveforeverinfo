import qs from 'qs';
import fetchPayInfo from "../apis/order/fetchPayInfo";
import pay from "../apis/order/pay";
import router from "../router";
/**
 *
 * */
export default function($event){
	console.log('$event:', $event);
	const { id = '' } = $event.detail;
	const { id: idFromCurrentTarget = '' } = $event.currentTarget.dataset;

	const orderId = id || idFromCurrentTarget;

	fetchPayInfo({ orderId }).then(({ code, data })=>{
		if (code * 1 === 1){
			const {
				timeStamp,
				nonceStr,
				packageStr,
				paySign,
				signType
			} = data;

			pay({
				orderId: id,
				timeStamp,
				nonceStr,
				packageStr,
				paySign,
				signType,
			}).then((res)=>{
				const { code, data, message } = res;
				if (code * 1 !== 1){
					throw new Error('支付失败, 请稍后重新支付或联系客服');
				}
				const query = {
					orderId: id
				};
				router.redirectTo({
					url: `/pages/order-result/order-result?$${qs.stringify(query)}`
				});
			}).catch(({ errMsg })=>{
				if(errMsg !== "requestPayment:fail cancel") { // 不是支付取消
					const query = {
						orderId: id
					};
					router.redirectTo({
						url: `/pages/order-result/order-result?$${qs.stringify(query)}`
					});
				}
			});
		} else {
			wx.showToast({
				icon: 'none',
				title: '当前订单状态有误,请稍后重试或联系客服'
			});
		}
	})
};
