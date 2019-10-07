import computedBehavior from 'miniprogram-computed';
import router from '../../router';

Component({
  behaviors: [computedBehavior],
  properties: {
    tabs: {
      type: Array,
      value: []
    },
    selectedTabIndex: {
      type: Number,
      value: 0
    }
  },
  methods: {
    select($event){
      const { index } = $event.currentTarget.dataset;
      const { pagePath = '' } = this.data.tabs[index];
      router.redirectTo({
        url: pagePath
      });
    }
  }
})
