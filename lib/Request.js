export default class Router {
	constructor(){}
	beforeRequest(request, next){
		next(request);
	}
	afterRequest(response, next){
		console.log('==============response:', response);
		next(response);
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
			wx.request(Object.assign(params,{
				success: (res) => {
					const { data } = res || {};
					this.afterRequest(data,(res)=>{
						success(data);
					});
				},
				fail: (error) => {
					this.afterRequest(error,(error)=>{
						fail(error.errMsg);
					});
				}
			}));
		});
	}
};
