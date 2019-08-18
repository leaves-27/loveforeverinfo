export default ()=> new Promise( (resolve, reject)=>{
	setTimeout(()=>{
		resolve({
			code: 1,
			data: [{
				id: '01',
				name: '提货点1',
				address: '浙江省杭州市古荡街道110号',
			}, {
				id: '02',
				name: '赵四 188****2773',
				address: '浙江省杭州市古荡街道110号',
			}]
		})
	}, 1000);
});
