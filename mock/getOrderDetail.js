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
			return item.orderCode === id;
		}) || {};

		resolve({
			code: 1,
			data: order
		});
	}).catch((item)=>{

	});
});
