import Router from '@leaves-27/mingrogram-router';
import routes from "./routes/index";

const router = new Router(routes);
router.beforeCreate = function(url, next){
	const { items = [], redirect } = this.routes;
	const route = items.find((item)=>{
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
