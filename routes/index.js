import UserRole from '../role';
import customer from './customer';
import doctor from './doctor';
import medical from './medical';

const all = [UserRole['customer'], UserRole['doctor'], UserRole['medical']];

export default {
	redirect: '/pages/authorize/authorize',
	items: [
		...customer,
		...doctor,
		...medical,
		{
			path: "/pages/bind-phone/bind-phone",
			role: all,
		},
		{
			path: "/pages/authorize/authorize",
			role: all,
		},
		{
			path: "/pages/authorize-phone/authorize-phone",
			role: all,
		}
	]
};
