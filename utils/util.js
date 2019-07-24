const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getCurrentRoute = ()=>{
  let pages = getCurrentPages();
  let currPage = null;
  if (pages.length) {
    currPage = pages[pages.length - 1];
  }
  return currPage;
};

const getQuery = ()=>{
  const { options = {} } = getCurrentRoute() || {};
  const query = {};
  Object.keys(options).map((item)=>{
    query[`${item.slice(1)}`] = options[item];
  });
  return query;
}

const placeholderUrl = 'https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/home/img/qrcode/zbios_x2_5869f49.png';

module.exports = {
  formatTime,
  getCurrentRoute,
  getQuery,
  placeholderUrl
}


