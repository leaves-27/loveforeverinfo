import { placeholderUrl } from '../../utils/util';
import getOrders from './getOrders';

export default (id)=> new Promise( (resolve, reject)=>{
	getOrders().then((result)=>{
		console.log('result:', result);
		const { code, data = [], message } = result;
		if (code !== 1) {
			throw new Error(message || '请求错误');
		}
		const order = data.find((item)=>{
			return item.id === id;
		}) || {};
		console.log('order:', order);

		resolve({
			code: 1,
			data: {
				address: {
					id: '',
					desc: '杭州市西湖区蒋村花园晴川街街道西溪花园红柿苑xxx号'
				},
				deliveryWays: [{
					id: 1,
					name: '快递配送'
				}, {
					id: 2,
					name: '自提'
				}],
				good: {
					name: '喜燕周年装',
					menuLogoUrl: placeholderUrl,
					price: 380.88,
					amount: 1,
					deliveryFee: 10
				},
				payWays: [{
					id: '1',
					iconUrl: placeholderUrl,
					name: '微信支付'
				}, {
					id: '2',
					iconUrl: placeholderUrl,
					name: '线下支付'
				}],
				count: 1,
				other: ''
			}
		});
	}).catch((item)=>{

	});
});
