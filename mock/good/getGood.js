import {placeholderUrl, request} from '../../utils/util';
import { apiPrifix } from '../../config/index';

export default ()=> new Promise( (resolve, reject)=>{
	request.request({
		isMock: true,
		isSuccess: true,
		url: `${apiPrifix}/getGood`,
		success: (res)=>{
			// resolve(res);
			resolve({
				code: 1,
				data: [{
					id: '11',
					logoUrl: placeholderUrl,
					name: '喜燕周年装',
					price: '380.88',
					desc: '详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍详情介绍',
					imgs: [
						'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
						'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
						'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
					],
					pictures: [
						'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
						'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
						'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
					],
					specials: [
						'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
						'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
						'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
					],
					suites: [6, 6],
				}]
			})
		},
		fail: (error)=>{
			reject(error);
		}
	});
});
