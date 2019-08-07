import { placeholderUrl } from '../utils/util';

export default ({
    name = '',
    phone = '',
    desc = 1
  })=>{
	return new Promise( (resolve, reject)=>{
		setTimeout(()=>{
			resolve({
				code: 1,
				data: true
			});
		}, 500)
	})
};
