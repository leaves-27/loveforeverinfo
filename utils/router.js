import Router from '../lib/Router';
import route from "./route/index";

const router = new Router(route);
router.beforeCreate = function(url, next){
	const { routes = [], redirect } = this.route;
	const route = routes.find((item)=>{
		const { path = '' } = item;
		const regExp = new RegExp(path);
		return regExp.test(url);
	});

	if (route){
		const currentUserRole = wx.getStorageSync('userRole');
		const { role = [] } = route;
		const index = role.indexOf(`${currentUserRole}`);
		if (role.length === 0 || index > -1){
			next();
			return;
		}
	}

	wx.redirectTo({
		url: redirect
	});
};
export default router;
