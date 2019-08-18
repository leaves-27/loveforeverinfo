export default ({ phone, password })=> new Promise( (resolve, reject)=>{
	setTimeout(()=>{
		resolve({
			code: 1,
			data: {
				token: ''
			}
		})
	}, 1000);
});
