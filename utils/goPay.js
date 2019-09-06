import qs from 'qs';
import router from './router';
/**
 *
 * */
export default function($event){
	const query = {
		statusId: 0
	};
	router.navigateTo({
		url: `pages/order-result/order-result?$${qs.stringify(query)}`
	});
};
