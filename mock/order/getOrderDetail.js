import getOrders from './getOrders';
import {request} from "../../utils/util";

export default (id)=> new Promise( (resolve, reject)=>{
	getOrders().then((result)=>{
		console.log('result:', result);
		const { code, data = [], message } = result;
		if (code !== 1) {
			throw new Error(message || '请求错误');
		}
		const order = data.find((item)=>{
			return item.orderCode === id;
		}) || null;

		request.request({
			isMock: true,
			isSuccess: true,
			url: '',
			data: {
				id
			},
			success: (res)=>{
				// resolve(res);
				resolve({
					code: 1,
					data: order
				});
			},
			fail: (error)=>{
				reject(error);
			}
		});

	}).catch((item)=>{

	});
});
