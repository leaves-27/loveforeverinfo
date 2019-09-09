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
      router.navigateTo({
        url: pagePath
      });
    }
  },
  lifetimes: {
    attached: function() {
      //console.log('===tabs:', this.data.tabs);
    },
  },
})
