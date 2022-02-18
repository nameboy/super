// pages/cart/index.js
Page({
   
  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
   
    totalPrice:0,
    totalNum:0
  },
  onShow(){
        // 获取本地缓存中的收货地址
        const address=wx.getStorageSync("address");
        // 获取缓存中的购物车数据
        let cart=wx.getStorageSync("cart")||[];
        // const allChecked=cart.length?cart.every(v=>v.checked):false;   
        // 过滤后的购物出数组
         cart=cart.filter(v=>v.checked)
        this.setData({
          address
        })                                 
        let totalPrice=0;
        let totalNum=0;
        cart.forEach(v => {
          
              totalPrice+=v.num*v.data.message.goods_price;
              totalNum+=v.num
          
        });
        
        this.setData({
          cart,
          totalPrice,
          totalNum,
          address
        });
        
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  
})