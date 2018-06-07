Page({
  data: {
  content1:'',
  content2:'',
  },
  inputContent1:function(e){
    this.setData({content1:e.detail.value.trim()});
  },

  inputContent2: function (e) {
    this.setData({ content2: e.detail.value.trim() });
  },
  
  create:function(e){
    if (!this.data.content1 || !this.data.content2) {
      wx.showToast({ title: '请填写内容', icon: 'none' });
      return;
    }
  
    var cards = wx.getStorageSync('cards')||[];
    var card = {
      content1: this.data.content1,
      content2: this.data.content2,
    };
    cards.push(card);
    wx.setStorageSync('cards', cards);
    setTimeout(function(){
      wx.showToast({
        title: '卡片已创建',
      })
    },500)
    wx.navigateBack();
  }
})