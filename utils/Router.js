import Router from '../lib/Router';
import route from "./route";

const router = new Router(route);
router.beforeCreate = (url, next)=>{
	const { redirect = '', routes = []} = this.route;
	const currentUserRole = wx.getStorageSync('userRole');
	const regExp = new RegExp(url.replace('/','\/'));
	const route = routes.find((item)=>{
		return regExp.test(item.path);
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
