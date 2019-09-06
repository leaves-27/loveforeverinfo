import qs from "qs";
import {goUserHome} from "./util";

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
 * 无刷新返回上个页面
 * */
export const navigateBack = (delta, keyValue)=>{
	const pages = getCurrentPages();
	const prevPage = pages[ pages.length - 1 - delta ];
	prevPage.setData(keyValue);
	wx.navigateBack({ delta });
};

export const saveImageToPhotosAlbum = (url)=>{
	return new Promise((resolve, reject)=>{
		wx.saveImageToPhotosAlbum({
			filePath: url,
			success: function (data) {
				resolve(data)
			},
			fail(res){
				reject(res);
			}
		});
	});
}
