import { placeholderUrl } from '../utils/util';

export default ()=> new Promise( (resolve, reject)=>{
	setTimeout(()=>{
		resolve({
			code: 1,
			data: [{
				id: '01',
				name: '张医生',
				logoUrl: placeholderUrl,
				unit: '市妇女儿童医院 妇产科'
			}, {
				id: '02',
				name: '张医生',
				logoUrl: placeholderUrl,
				unit: '市妇女儿童医院 妇产科'
			}]
		})
	}, 1000);
});
