export default ()=> new Promise( (resolve, reject)=>{
	setTimeout(()=>{
		resolve({
			code: 1,
			data: {
				addresses: [{
					id: '01',
					name: '赵四',
					phone: '18076861167',
					address: '浙江杭州市滨江区中控科技园E幢22楼'
				}, {
					id: '02',
					name: '赵四',
					phone: '18076861167',
					address: '浙江杭州市滨江区中控科技园E幢22楼'
				}],
				addressId: '01'
			}
		})
	}, 1000);
});
