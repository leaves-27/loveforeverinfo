import Router from '@leaves-27/mingrogram-router';
import routes from "./routes/index";

const router = new Router(routes);
router.beforeCreate = function(url, next){
	const { items = [], redirect } = this.routes;

	// 获取到当前路由对象
	const route = items.find((item)=>{
		const { path = '' } = item;
		const regExp = new RegExp(path);
		return regExp.test(url);
	});

	if (route){
		const { role = [] } = route;
		// 不需要授权的页面
		if(role.length === 0){
			next();
			return;
		}

		const currentUserRole = wx.getStorageSync('userRole');
		// 需要授权的页面
		if (!!currentUserRole && role.indexOf(`${currentUserRole}`) > -1){
			next();
			return;
		}
	}

	wx.navigateTo({
		url: redirect
	});
};
export default router;
