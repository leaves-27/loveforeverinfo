import customer from './customer';
import doctor from './doctor';
import medical from './medical';
import UserRole from "../userRole";

const items = [
	...customer,
	...doctor,
	...medical,
	{
		path: "/pages/bind-phone/bind-phone"
	}
];

export default {
	redirect: '/pages/authorize/authorize',
	items
};
