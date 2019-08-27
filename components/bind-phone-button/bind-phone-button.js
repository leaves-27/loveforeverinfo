import decryption from '../../apis/decryption';
Component({
  properties: {
    phone: {
      type: String,
      value: ''
    }
  },
  methods: {
    goBindPhone(phone = ''){
      wx.navigateTo({
        url: `../bind-phone/bind-phone?phone=${ phone }`
      });
    },
    getPhoneNumber($event){
      const { iv, encryptedData } = e.detail;
      decryption(iv, encryptedData).then((result)=>{
        const { code, data } = result;
        const { phoneNumber } = data;
        this.goBindPhone(phoneNumber);
      })
    }
  }
})
