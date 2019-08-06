import { placeholderUrl } from '../utils/util';
import getOrders from './getOrders';

export default ({
  adressId = '',
  goodId = '',
  amount = 1,
  deliveryId = '',
  desc = '',
  payId = ''
})=>{
	console.log('================11', {
		adressId,
		goodId,
		amount,
		deliveryId,
		desc,
		payId
	});
	return new Promise( (resolve, reject)=>{
		setTimeout(()=>{
			resolve({
				code: 1,
				data: true
			});
		}, 500)
	})
};
