// 对象或数组的深拷贝方法
export default (data)=>{ // 数组或对象
	return JSON.parse(JSON.stringify(data));
}
