export default ()=> new Promise( (resolve, reject)=>{
	setTimeout(()=>{
		resolve({
			code: 1,
			data: [{
				id: '01',
				name: "微信支付",
			}, {
				id: '02',
				name: "线下支付",
			}]
		})
	}, 1000);
});
