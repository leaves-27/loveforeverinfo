import computedBehavior from 'miniprogram-computed';
import router from '../../router';

Component({
  behaviors: [computedBehavior],
  properties: {
    tabs: {
      type: Array,
      value: []
    }
  },
  computed: {
    selectedTabIndex(){
      return getApp().globalData.selectedTabIndex || 0;
    }
  },
  methods: {
    select($event){
      const { index } = $event.currentTarget.dataset;
      getApp().globalData.selectedTabIndex = index;
      const { pagePath = '' } = this.data.tabs[index];

      router.redirectTo({
        url: pagePath
      });
    }
  },
  pageLifetimes: {
    show: function () {
      console.log('===getApp().globalData.selectedTabIndex:', getApp().globalData.selectedTabIndex);
    }
  }
})
