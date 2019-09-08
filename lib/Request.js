export default class Router {
	constructor(){}
	beforeRequest(request, next){
		next();
	}
	afterRequest(response, next){
		next();
	}
	request({
    url = '',
    method,
    data,
    header,
    success = ()=>{},
    fail = ()=>{},
    isMock = false,
    isSuccess = false
  }){
		const token = wx.getStorageSync('token');
		const params = Object.assign({
			url: '',
			method: 'get',
			data: {},
			header: {
				'content-type': 'application/json', // 默认值
				'token': token
			}
		}, {
			url,
			method,
			data: {
				...data
			},
			header
		});

		this.beforeRequest({
			...params,
			success,
			fail,
			isMock,
			isSuccess,
		}, ()=>{
			const _self = this;
			wx.request(Object.assign(params,{
				success (res) {
					_self.afterRequest(res,()=>{
						success(res.data);
					})
				},
				fail(error){
					_self.afterRequest(error,()=>{
						fail(error.errMsg);
					})
				}
			}));
		});
	}
};
