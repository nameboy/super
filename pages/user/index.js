// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     userInfo:{}
  },
   onShow(){
      const userinfo = wx.getStorageSync("userinfo")
      this.setData({
        userinfo
      })
   }
 
})