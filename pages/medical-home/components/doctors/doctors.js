import qs from "qs";
import {staticPrefix} from "../../../../config/index";
import router from '../../../../router';

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
      router.navigateTo({
        url: `/pages/medical-doctor-detail/doctor-detail?$${qs.stringify(query,  { encode: false })}`
      })
    }
  }
})
