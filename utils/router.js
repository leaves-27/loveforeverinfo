import Router from '../lib/Router';
import route from "./route/index";

const router = new Router(route);
router.beforeCreate = function(url, next){
	const { redirect = '', routes = []} = this.route;
	const currentUserRole = wx.getStorageSync('userRole');
	const route = routes.find((item)=>{
		const regExp = new RegExp(item);
		return regExp.test(url);
	});

	const { role = [] } = route;
	if (role.indexOf(currentUserRole) > 0){
		next();
	} else {
		wx.navigateTo({
			url: redirect || '/pages/login/login'
		});
	};
};
export default router;
