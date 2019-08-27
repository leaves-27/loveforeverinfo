import qs from "qs";

/**
 * 获取当前页面路由
 * */
export const getCurrentRoute = ()=>{
	let pages = getCurrentPages();
	let currPage = null;
	if (pages.length) {
		currPage = pages[pages.length - 1];
	}
	return currPage;
};

/**
 * 获取当前页面参数
 * */
export const getQuery = ()=>{
	const { options = {} } = getCurrentRoute() || {};
	const query = {};
	Object.keys(options).map((item)=>{
		if (/\$/.test(item)){
			query[`${item.slice(1)}`] = options[item];
		} else {
			query[`${item}`] = options[item];
		}
	});
	return query;
};

/**
 * 请求拦截器
 * */
export const request = (options = {}) => {
	const token = wx.getStorageSync('token');
	if (!token){
		wx.navigateTo({
			url: `../login/login?$${qs.stringify(query)}`
		});
		return;
	};
	const {
		url,
		method,
		data,
		header,
		success = ()=>{},
		fail = ()=>{}
	} = options;

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
		data,
		header
	});

	wx.request(Object.assign(params,{
		success (res) {
			console.log('request success：', res);
			success(res.data);
		},
		fail(error){
			console.log('request fail：', error);
			fail(error.errMsg);
		}
	}));
};
