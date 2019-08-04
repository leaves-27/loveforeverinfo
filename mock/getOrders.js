import { placeholderUrl } from '../utils/util';

export default ()=> new Promise( (resolve, reject)=>{
	setTimeout(()=>{
		resolve({
			code: 1,
			data: [{
				id: '1',
				time: '2019-6-17  12:00:12',
				status: '1',
				name: '喜燕周年装',
				menuLogoUrl: placeholderUrl,
				price: 380.88,
				amount: 1,
				deliveryFee: 10
			}, {
				id: '2',
				time: '2019-6-17  12:00:12',
				status: '2',
				name: '喜燕周年装',
				menuLogoUrl: placeholderUrl,
				price: 380.88,
				amount: 1,
				deliveryFee: 10
			}, {
				id: '3',
				time: '2019-6-17  12:00:12',
				status: '3',
				name: '喜燕周年装',
				menuLogoUrl: placeholderUrl,
				price: 380.88,
				amount: 1,
				deliveryFee: 10
			}]
		})
	}, 1000);
});
