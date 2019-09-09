import Router from '../lib/Router';
import route from "./route/index";
import UserRole from "./userRole";

const router = new Router(route);
router.beforeCreate = function(url, next){
	const { redirect = '', routes = []} = this.route;
	const route = routes.find((item)=>{
		const { path = '' } = item;
		const regExp = new RegExp(path);
		return regExp.test(url);
	});

	const currentUserRole = wx.getStorageSync('userRole');
	const { role = [] } = route;

	console.log('role:', role);
	console.log('currentUserRole', currentUserRole);
	console.log('url', url);
	console.log('role.indexOf(`${currentUserRole}`):', role.indexOf(`${currentUserRole}`));

	if (role.indexOf(`${currentUserRole}`) > -1){
		next();
	} else {
		wx.navigateTo({
			url: redirect || '/pages/login/login'
		});
	};
};
export default router;
