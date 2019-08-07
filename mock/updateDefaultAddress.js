export default ({
  addressId = ''
})=>{
	return new Promise( (resolve, reject)=>{
		setTimeout(()=>{
			resolve({
				code: 1,
				data: true
			});
		}, 500)
	})
};
