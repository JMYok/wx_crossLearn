Page({
  data: {
    userId:'',
    cards: [],
    //动画数据
    animationData: {},
    choice:1
  },
  //增加页面
  addCard: function (e) {
    setTimeout(function () {
      wx.navigateTo({ url: '../addDetail/addDetail' })
    },500)     
  },

  onShow: function () {
    var cards = wx.getStorageSync('cards');
    this.setData({
      cards: cards
    })  
  },

rotate:function(e){
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
  if(this.data.choice ==  1){
  this.setData({
      choice:0
  })
  }else{
    this.setData({
      choice: 1
    })
  }
},
  
  //删除页面事件函数
  delete:function(){
  wx.showModal({
    content: '确定要删除吗？',

    confirmText: '是的',

    cancelText: '返回',

    success: function (res) {

      if (res.confirm) {

        console.log('用户点击主操作')

      } else if (res.cancel) {

        console.log('用户点击次要操作')

      }
  }
  })
  },
  //编辑页面
  edit:function(){
    setTimeout(function () {
      wx.navigateTo({ url: '../editDetail/editDetail' })
    }, 500)     
  }
})