import Router from '../lib/Router';
import route from "./route/index";

const router = new Router(route);
router.beforeCreate = function(url, next){
	const { routes = [], redirect} = this.route;
	const route = routes.find((item)=>{
		const { path = '' } = item;
		const regExp = new RegExp(path);
		return regExp.test(url);
	});

	const currentUserRole = wx.getStorageSync('userRole');
	const { role = [] } = route;
	const index = role.indexOf(`${currentUserRole}`);
	if (index > -1){
		next();
	} else {
		wx.redirectTo({
			url: redirect
		})
	}
};
export default router;
