import { apiPrifix } from '../../config/index';
import { request } from '../utils/util'

export const getUserInfoFromWx = ()=>{
	return new Promise(async (resolve, reject)=>{
		wx.getUserInfo({
			success: res => {
				resolve(res)
			},
			fail(error){
				reject(error);
			}
		})
	})
};

export const getUserInfoFromSelfService = ()=>{
	return new Promise(async (resolve, reject)=>{
		request({
			url: `${apiPrifix}/getUserRole`,
			method: 'get',
			data: {},
			header: {
				'content-type': 'application/json' // 默认值
			},
			success (res) {
				resolve(res.data)
			},
			fail(){
				reject(res.errMsg);
			},
		})
	})
};

export default getUserInfoFromSelfService;


