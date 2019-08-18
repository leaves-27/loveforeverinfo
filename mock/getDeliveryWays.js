export default ()=> new Promise( (resolve, reject)=>{
	setTimeout(()=>{
		resolve({
			code: 1,
			data: [{
				id: '01',
				name: "快递配送",
			}, {
				id: '02',
				name: "自提",
			}]
		})
	}, 1000);
});
