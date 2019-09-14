import customer from './customer';
import doctor from './doctor';
import medical from './medical';
import UserRole from "../userRole";

const routes = [
	...customer,
	...doctor,
	...medical,
	{
		path: "/pages/bind-phone/bind-phone",
		role: [UserRole['customer'], UserRole['doctor'], UserRole['medical']],
	},
	{
		path: "/pages/login/login",
		role: [UserRole['customer'], UserRole['doctor'], UserRole['medical']],
	}
];

export default {
	redirect: '/pages/bind-phone/bind-phone',
	routes
};
