import customer from './customer';
import doctor from './doctor';
import medical from './medical';
import UserRole from "../userRole";

const routes = [
	...customer,
	...doctor,
	...medical,
	{
		path: "/pages/bind-phone/bind-phone"
	},
	{
		path: "/pages/login/login"
	}
];

export default {
	redirect: '/pages/bind-phone/bind-phone',
	routes
};
