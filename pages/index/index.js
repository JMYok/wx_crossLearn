Page({
  data: {
    userId: '',
    cards: [],
    //动画数据
    animationData: {},
    choice: 1
  },
  //增加页面
  addCard: function (e) {
    setTimeout(function () {
      wx.navigateTo({ url: '../addDetail/addDetail' })
    }, 500)
  },

  onShow: function () {
    var catergory_id = wx.getStorageSync('catergory_id') || 1
    if (wx.getStorageSync('radioChange') == true) {
      wx.showLoading()
      wx.request({
        url: 'http://miniprogram.test/api/cards/' + catergory_id,
        method: 'GET',
        header: {
          Authorization: 'Bearer ' + wx.getStorageSync('token')
        },
        success: function (res) {
          var cards = res.data.data
          wx.setStorageSync('cards', cards)
          wx.hideLoading()
        }
      })
      wx.setStorageSync('radioChange', false)
    } else {
      if (wx.getStorageSync('cards')) {
        var cards = wx.getStorageSync('cards');
      } else {
        wx.showLoading()
        wx.request({
          url: 'http://miniprogram.test/api/cards/' + catergory_id,
          method: 'GET',
          header: {
            Authorization: 'Bearer ' + wx.getStorageSync('token')
          },
          success: function (res) {
            var cards = res.data.data
            wx.setStorageSync('cards', cards)
            wx.hideLoading()
          }
        })
      }
    }
    this.setData({
      cards: wx.getStorageSync('cards')
    })

  },

  rotate: function (e) {
    //实现旋转
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease-out',
      delay: 0,
      transformOrigin: 'left top 100'
    })
    animation.rotateY(360).step()
    this.setData({
      animationData: animation.export()
    })

    //设置数据使显示反面效果
    if (this.data.choice == 1) {
      this.setData({
        choice: 0
      })
    } else {
      this.setData({
        choice: 1
      })
    }
  },

  //删除页面事件函数
  delete: function (e) {
    var id = e.currentTarget.dataset.id
    var category_id = wx.getStorageSync('category_id')
    wx.showModal({
      content: '确定要删除吗？',

      confirmText: '是的',
      confirmColor: '#0384D5',
      cancelText: '手误了',
      cancelColor: 'red',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading()
          wx.request({
            url: 'http://miniprogram.test/api/cards/delete_card/' + id,
            method: 'DELETE',
            header: {
              'Content-Type':'application/x-www-form-urlencoded',
              Authorization: 'Bearer ' + wx.getStorageSync('token')
            },
            success: function () {
              //重新拉取现在数据
              wx.request({
                url: 'http://miniprogram.test/api/cards/' + category_id ,
                method: 'GET',
                data:{
                id:category_id
                },
                header: {
                  Authorization: 'Bearer ' + wx.getStorageSync('token')
                },
                success: function (res) {
                  var cards = []
                  var data = res.data.data
                  for (var i = 0, len = data.length; i < len; i++) {
                    var card = {
                      id: data[i].id,
                      front: data[i].front,
                      behind: data[i].behind,
                    };
                    cards.push(card)
                  }
                  wx.setStorageSync('cards', cards)
                  wx.hideLoading()
                  wx.showToast({
                    title: '删除成功',
                    icon: 'success',
                    duration: 1500
                  })
                  wx.navigateBack()
                }
              })
            }
          })      
       }        
      }
    })
  },
      //编辑页面
      edit: function (e) {
        var id = e.currentTarget.dataset.id
        var index = e.currentTarget.dataset.index
        var front = e.currentTarget.dataset.front
        var behind = e.currentTarget.dataset.behind
        
        wx.navigateTo({
           url: '../editDetail/editDetail?index=' + index +'&id='+id +'&front='+front+'&behind='+behind  
           })
       
     }   
 })