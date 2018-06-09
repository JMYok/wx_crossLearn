// pages/editDetail/editDetail.js
Page({
  onLoad: function (options) {
    this.setData({
      id: options.id,
      index: options.index,
      front: options.front,
      behind: options.behind
    })
  },

  finish:function(e){
    var category_id = wx.getStorageSync('category_id')
    var id = this.data.id
    var index = this.data.index
    var new_front = e.detail.value.front.trim()
    var new_behind = e.detail.value.behind.trim()
    var cards = wx.getStorageSync('cards')

    if (new_front && new_behind) {
      cards[index].front = new_front
      cards[index].behind = new_behind
      wx.showLoading()
      wx.request({
        url: 'http://miniprogram.test/api/cards/edit_card',
        method: 'PUT',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer ' + wx.getStorageSync('token')
        },
        data: {
          card_id:id,
          category_id: category_id,
          front: new_front,
          behind: new_behind
        },
        success: function () {
          wx.setStorageSync('cards', cards)
          setTimeout(function () {
            wx.navigateBack();
          }, 3000)
          setTimeout(function () {
            wx.showToast({
              title: '编辑成功',
            })
          }, 3500)

        }
      })
    } else {
      wx.showToast({
        title: '内容不能为空',
        icon: 'none',
        mask: true,
        duration: 1500
      })
    }
  }
})