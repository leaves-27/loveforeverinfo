import { placeholderUrl } from '../utils/util';
import getOrders from './getOrders';

export default ({
  adress = {
    id: '',
    desc: ''
  },
  goodId = '',
  count = '',
  deliveryWayId = '',
  desc = '',
  payWayId = ''
})=>{
	console.log('================11');
	return new Promise( (resolve, reject)=>{
		setTimeout(()=>{
			resolve({
				code: 1,
				data: true
			});
		}, 500)
	})
};
