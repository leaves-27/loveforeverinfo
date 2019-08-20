import {staticPrifix} from "../../../../config/index";
import qs from "qs";

Component({
  properties: {
    doctors: {
      type: Array,
      value: []
    },
  },
  data: {
    arrowRightUrl: `${staticPrifix}/arrow_right.png`,
  },
  methods: {
    goDoctorDetail(){
      // wx.navigateTo({
      //   url: `../my-qr/my-qr?$${qs.stringify(query,  { encode: false })}`
      // })
    }
  }
})
