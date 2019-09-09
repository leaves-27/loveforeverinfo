import computedBehavior from 'miniprogram-computed';
import { router } from '../../utils/util';

Component({
  behaviors: [computedBehavior],
  properties: {
    tabs: {
      type: Array,
      value: []
    }
  },
  computed(){
    return {
      selectedTabIndex:  getApp().globalData.selectedTabIndex
    }
  },
  methods: {
    select($event){
      const { index } = $event.currentTarget.dataset;
      app.globalData.selectedTabIndex = index;
      const { pagePath = '' } = this.data.tabs[index];
      router.navigateTo({
        url
      });
    }
  }
})
