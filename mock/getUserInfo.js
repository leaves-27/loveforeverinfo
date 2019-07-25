import { placeholderUrl } from '../utils/util';

export default ()=> new Promise( (resolve, reject)=>{
	setTimeout(()=>{
		resolve({
			code: 1,
			data: {
				name: '疯趣的二师兄',
				phone: '135****8888',
				score: 200000,
				qrUrl: placeholderUrl,
				logoUrl: placeholderUrl,
				addressIconUrl: placeholderUrl
			}
		})
	}, 1000);
});
