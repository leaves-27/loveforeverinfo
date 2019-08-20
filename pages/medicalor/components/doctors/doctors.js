import {staticPrifix} from "../../../../config/index";

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

    }
  }
})
