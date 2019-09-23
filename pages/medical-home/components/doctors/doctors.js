import qs from "qs";
import {staticPrefix} from "../../../../config/index";

Component({
  properties: {
    doctors: {
      type: Array,
      value: []
    },
  },
  data: {
    arrowRightUrl: `${staticPrefix}/arrow_right.png`,
  },
  methods: {
    goDoctorDetail($event){
      const { item } = $event.currentTarget.dataset;
      const { id } = item;
      const query = {
        id,
      };
      wx.navigateTo({
        url: `../medical-doctor-detail/doctor-detail?$${qs.stringify(query,  { encode: false })}`
      })
    }
  }
})
