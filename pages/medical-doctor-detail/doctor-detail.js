import qs from 'qs';
import getDoctorDetail from "../../mock/getDoctorDetail";
import { getQuery } from "../../utils/util";

Page({
  data: {
    name: '',
    phone: '',
    logoUrl: '',
    hospital: '',
    department: '',
    score: 0,
    userCount: 0,
    level: '',
  },
  onLoad(){
    const { id = '' } = getQuery();
    getDoctorDetail(id).then((result)=>{
      const { code, data, message } = result || {};
      if (code !== 1) {
        throw new Error(message || '请求错误');
      }
      const {
        name = '',
        phone = '',
        score = 0,
        logoUrl = '',
        hospital = '',
        department = '',
        userCount = 0,
        level = '',
      } = data;

      this.setData({
        name,
        phone,
        score,
        logoUrl,
        hospital,
        department,
        userCount,
        level,
      })
    })
  },
})
