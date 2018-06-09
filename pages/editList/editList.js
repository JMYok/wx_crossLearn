Page({
  onLoad: function (options) {  
    this.setData({
      id:options.id,
      index: options.index,
      title: options.title,
      description: options.description
    })
   
  },

  finish_edit: function(e){
    var id = this.data.id
    var index =  this.data.index
    var new_name = e.detail.value.name.trim()
    var new_description = e.detail.value.description.trim()
    var cardList = wx.getStorageSync('cardList')

    if(new_name && new_description){
      cardList[index].name = new_name
      cardList[index].description = new_description
      wx.showLoading()
      wx.request({  
        url: 'http://miniprogram.test/api/categories/edit_category',
        method:'PUT',
        header:{
         'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer ' + wx.getStorageSync('token')
        },
        data:{
          category_id:id,
          name:new_name,
          introduction:new_description
        },
        success:function(){
          wx.setStorageSync('cardList', cardList)
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