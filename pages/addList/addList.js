Page({
  inputContent:function(e){
    var content1 = e.detail.value.content1.trim()
    var content2 = e.detail.value.content2.trim()

    if (content1 && content2) {
      if(content1.length < 20 || content2.length<200){
        wx.request({
          url: 'http://miniprogram.test/api/categories/new_category',
            method:'POST',
            data:{
              name:content1,
              introduction:content2
            },
            header:{
              Authorization: 'Bearer ' + wx.getStorageSync('token')
            },  
          success:function(res){  
            var cardset = {
              name: content1,
              description: content2,
            };
            var cardList =  wx.getStorageSync('cardList')
            cardList.push(cardset);
            wx.setStorageSync('cardList', cardList);
          }
        })
        setTimeout(function () {
          wx.showToast({
            title: '您的卡组已创建',
          })
        }, 500)
        wx.navigateBack();
      }else{
        wx.showToast({ title: '标题不能超过20字，内容不能超过200字哦~', icon: 'none' });
        return;
      }
     }else{
        wx.showToast({ title: '请填写内容', icon: 'none' });
     }
  
  }
})