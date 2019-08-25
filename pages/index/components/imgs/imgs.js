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
    console.log('l:', this.data.urls);
  }
});
