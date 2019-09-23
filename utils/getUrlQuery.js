import qs from "qs";

export default (url) => {
	if (url.indexOf('?') > -1) {
		const urls = url.split('?');
		return qs.parse(urls[1]);
	}
	return {};
}
