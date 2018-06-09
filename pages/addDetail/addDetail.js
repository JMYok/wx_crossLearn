Page({
  data: {
  front:'',
  behind:'',
  },
  
  create:function(e){
    var front = e.detail.value.front.trim()
    var behind = e.detail.value.behind.trim()
    var catergory_id = wx.getStorageSync('catergory_id')

    if (!front||!behind) {
      wx.showToast({ title: '请填写内容', icon: 'none' });
      return;
    }
    if (front.length < 500 || behind.length < 500) {
      wx.showLoading()
      wx.request({
        url: 'http://miniprogram.test/api/cards/new_card',
        method: 'POST',
        data: {
          front: front,
          behind: behind,
          category_id: catergory_id
        },
        header: {
          Authorization: 'Bearer ' + wx.getStorageSync('token')
        },
        success: function (res) {
          var cardset = {
            id:res.data.id,
            front: front,
            behind: behind
          };
          var cards = wx.getStorageSync('cards')
          cards.push(cardset);
          wx.setStorageSync('cards', cards);
        }
      })
      setTimeout(function () {
        wx.navigateBack();
      }, 3000)
      setTimeout(function () {
        wx.showToast({
          title: '您的爱卡已创建',
        })
      }, 3500)

    } else {
      wx.showToast({ title: '正反面字数都不能超过200字哦~', icon: 'none' });
      return;
    }
  }
})