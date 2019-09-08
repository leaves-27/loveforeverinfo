import router from './router';

export default function(userRole){
	if (userRole * 1 === 1){ // 消费者
		router.navigateTo({
			url: `pages/index/index`
		})
	} else if(userRole * 1 === 2){ // 医生
		router.navigateTo({
			url: `pages/doctor/doctor`
		})
	} else if (userRole * 1 === 3){// 医药代表
		router.navigateTo({
			url: `pages/medical-home/home`
		});
	} else if (userRole * 1 === 4){ // 派送员
		// 暂无
	} else {
		router.navigateTo({
			url: `pages/login/login`
		});
	}
};
