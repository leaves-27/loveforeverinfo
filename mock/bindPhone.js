export default ({ phone, validationCode })=> new Promise( (resolve, reject)=>{
	console.log('phone:', phone);
	const userType = phone === "18857152332" ? 1 : 2;

	setTimeout(()=>{
		resolve({
			code: 1, //
			data: null
		})
	}, 1000);
});
