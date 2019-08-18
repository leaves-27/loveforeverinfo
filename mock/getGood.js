import { placeholderUrl } from '../utils/util';

export default ()=> new Promise( (resolve, reject)=>{
	setTimeout(()=>{
		resolve({
			code: 1,
			data: [{
				id: '01',
				name: '喜燕周年装',
				menuLogoUrl: placeholderUrl,
				price: 380.88
			}]
		})
	}, 1000);
});
