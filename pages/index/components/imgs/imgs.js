Component({
  data: {},
  properties: {
    urls: {
      type: Array,
      value: []
    },
  },
  methods: {},
  onLoad(){
    console.log('ll:', this.data.urls);
  }
});
