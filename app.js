App({
  onLaunch: function () {
    //登录
    wx.login ({
      success: function (res) {
        if (res.code) {
          var JSCODE = res.code;
          wx.request({
            url: 'http://miniprogram.test/api/authorizations',
            method: 'POST',
            data: {
              code: JSCODE
            },
            success:function(res){
              wx.setStorageSync('token', res.data.access_token)
            }
          })
        } else {
          console.log('未成功获取code,登录失败');
        }
      }
    })}  
})

