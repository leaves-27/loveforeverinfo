export default class Router {
	constructor(route){
		this.route = route;
	}
	beforeCreate(url, next){
		next();
	}

	afterCreate(next){
		next();
	}

	navigateTo({ url, success = ()=>{} }){
		this.beforeCreate(url, ()=>{
			wx.navigateTo({
				url,
				success:()=>{
					this.afterCreate(success);
				}
			});
		});
	}
};
