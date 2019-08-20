export default ({ phone, verticationCode })=> new Promise( (resolve, reject)=>{
	setTimeout(()=>{
		resolve({
			code: 1,
			data: {
				token: '',
				userType: '1'
			}
		})
	}, 1000);
});
