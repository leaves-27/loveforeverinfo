import customer from './customer';
import doctor from './doctor';
import medical from './medical';

export default {
	redirect: '/pages/authorize/authorize',
	items: [
		...customer,
		...doctor,
		...medical,
		{
			path: "/pages/bind-phone/bind-phone"
		}
	]
};
