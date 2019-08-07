export default ()=> new Promise( (resolve, reject)=>{
	setTimeout(()=>{
		resolve({
			code: 1,
			data: [{
				id: '01',
				desc: '浙江省杭州市古荡街道110号',
			}, {
				id: '02',
				desc: '浙江省杭州市古荡街道110号',
			}]
		})
	}, 1000);
});
