import clone from './clone';

export default (items, id) => {
	const orders = clone(items);
	const index = orders.findIndex((item)=>{
		return item.orderId === id;
	});
	if (index > -1){
		orders.splice(index ,1);
	}
	return orders;
}
