import customer from './customer';
import doctor from './doctor';
import medical from './medical';
import UserRole from "../role";

export default {
	redirect: '/pages/authorize/authorize',
	items: [
		...customer,
		...doctor,
		...medical,
		{
			path: "/pages/bind-phone/bind-phone"
		},
		{
			path: "/pages/authorize/authorize"
		},
		{
			path: "/pages/authorize-phone/authorize-phone"
		},
		{
			path: '/pages/medical-my-qr/my-qr',
			role: [UserRole['medical'], UserRole['doctor']]
		},
	]
};
