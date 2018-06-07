// pages/editDetail/editDetail.js
Page({
  data:{

  },
  editContent1: function (e) {
    this.setData({ content1: e.detail.value.trim() });
  },

  editContent2: function (e) {
    this.setData({ content2: e.detail.value.trim() });
  },
})