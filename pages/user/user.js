Page({
  data: {
    //用户头像数据
    avatar: '',
    name: '',
    //牌组数据
    cardList: [],
  },

  onShow: function () {
    var cardList = wx.getStorageSync('cardList') || [];
    //检测缓存中是否有卡组信息
    if (wx.getStorageSync('cardList')) {
      var cardList = wx.getStorageSync('cardList')
      this.setData({
        cardList: cardList
      })
    } else {
      wx.request({
        url: 'http://miniprogram.test/api/categories',
        method: 'GET',
        header: {
          Authorization: 'Bearer ' + wx.getStorageSync('token')
        },
        success: function (res) {
          var data = res.data.data
          for (var i = 0, len = data.length; i < len; i++) {
            var cardset = {
              id: data[i].id,
              name: data[i].name,
              description: data[i].introduction,
            };

            cardList.push(cardset)
          }
          wx.setStorageSync('cardList', cardList)
        }
      })
      this.setData({
        cardList: cardList
      })
    }
  },

  //授权获取头像和名字
  authorize: function () {
    //判断缓存中是否有数据
    if (wx.getStorageSync('avatar') && wx.getStorageSync('name')) {
      this.setData({
        avatar: wx.getStorageSync('avatar'),
        name: wx.getStorageSync('name'),
      })
    } else {
      //从服务器拉取用户数据
      wx.request({
        url: 'http://miniprogram.test/api/user',
        method: 'GET',
        header: {
          Authorization: 'Bearer ' + wx.getStorageSync('token')
        },
        success: function (res) {
          //服务器中是否有头像或者名字
          var name = res.data.name
          var avatar = res.data.avatar
          if (name && avatar) {
            wx.setStorageSync('name', name)
            wx.setStorageSync('avatar', avatar)
          } else {
            wx.getUserInfo({
              lang: 'zh_CN',
              timeout: 8000,
              success: function (res) {
                wx.setStorageSync('name', res.userInfo.nickName)
                wx.setStorageSync('avatar', res.userInfo.avatarUrl)
              }
            })
          }
        }
      })
    }
    this.setData({
      name: wx.getStorageSync('name'),
      avatar: wx.getStorageSync('avatar'),
      authorization: true
    })
  },

  //牌组选项改变
  radioChange: function (e) {
    var value = e.detail.value
    wx.setStorageSync('catergory_id', value)
    wx.setStorageSync('radioChange', true)
  },
  //增加牌组
  addList: function () {
    setTimeout(function () {
      wx.navigateTo({ url: '../addList/addList' })
    }, 500)
  },

  //查看牌组信息
  check: function (e) {
    var id = e.currentTarget.dataset.id
    var title = e.currentTarget.dataset.title
    var description = e.currentTarget.dataset.description
    wx.showModal({
      title: '名称:' + title,
      content: '描述: ' + description,
      showCancel: true,
      confirmText: '返回',
      cancelText: '删除卡组',
      cancelColor: 'red',
      success: function (res) {
        if (res.cancel) {
          //提示模态框
          wx.showModal({
            title: '确实删除吗',
            content: '删除后该卡组的所有卡片信息将丢失~~',
            showCancel: true,
            confirmText: '我意已决',
            confirmColor: 'red',
            cancelText: '手误了',
            cancelColor: '#0384D5',
            success: function (res) {
              //实现卡组删除
              if (res.confirm) {
                wx.showLoading()
                wx.request({
                  url: 'http://miniprogram.test/api/categories/delete_category/' + id,
                  method: 'DELETE',
                  data: {
                    id: id
                  },
                  header: {
                    Authorization: 'Bearer ' + wx.getStorageSync('token')
                  },
                  success: function () {
                    //重新拉取现在数据
                    wx.request({
                      url: 'http://miniprogram.test/api/categories',
                      method: 'GET',
                      header: {
                        Authorization: 'Bearer ' + wx.getStorageSync('token')
                      },
                      success: function (res) {
                        var cardList = []
                        var data = res.data.data
                        for (var i = 0, len = data.length; i < len; i++) {
                          var cardset = {
                            id: data[i].id,
                            name: data[i].name,
                            description: data[i].introduction,
                          };  
                          cardList.push(cardset)
                        }
                        wx.setStorageSync('cardList', cardList)
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
              } else if (res.cancel) {
                wx.navigateBack()
              }
            }
          })

        }
      }
    })
  },

  //编辑牌组信息
  edit: function (e) {
    var id = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index
    var title = e.currentTarget.dataset.title
    var description = e.currentTarget.dataset.description
    wx.navigateTo({
      url: '../editList/editList?index=' + index + '&title=' + title + '&description=' + description + '&id=' +id
    })
  }

})