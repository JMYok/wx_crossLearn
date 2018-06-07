Page({
  onLoad: function (options) {
    
    this.setData({
      index: options.index,
      title: options.title,
      description: options.description
    })
   
  },

  finish_edit: function(e){
    var index =  this.data.index
    var that = this
    var new_name = e.detail.value.name.trim()
    var new_description = e.detail.value.description.trim()
    var cardList = wx.getStorageSync('cardList') 
    if(new_name && new_description){
      cardList[index].name = new_name
      cardList[index].description = new_description

      wx.request({
        url: 'http://miniprogram.test/api/categories/edit_category',
        method:'PATCH',

      })

      wx.setStorageSync('cardList',cardList)
      wx.navigateBack()
    }else{
        wx.showToast({
          title: '内容不能为空',
          icon:'none',
          mask:true,
          duration:1500
        })      
    }
  }
})