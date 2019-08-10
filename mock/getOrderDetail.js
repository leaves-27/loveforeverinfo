import { placeholderUrl } from '../utils/util';
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
				user: {
					name: '疯趣的二师兄',
					phone: '135****8888',
					userLogoUrl: placeholderUrl,
					address: '浙江杭州市江干区明月桥路38号'
				},
				good: {
					name: '喜燕周年装',
					menuLogoUrl: placeholderUrl,
					price: 380.88,
					deliveryFee: 10
				},
				order: {
					...order,
					orderCode: '',
					createTime: '',
					payTime: '',
					successTime: '',
					desc: '20分钟后自动关闭',
					amount: 1,
				},
			}
		});
	}).catch((item)=>{

	});
});
