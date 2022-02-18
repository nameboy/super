// pages/goos_detail/index.js
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
       goodsObj:{}
  },
  GoodsInfo:{},
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        const {goods_id} = options;
        console.log(goods_id);
        this.getGoodsDetail(goods_id)
  },
  // 获取商品详情数据
  getGoodsDetail(goods_id){
     request({url:"/goods/detail",data:{goods_id}})
     
     .then(goodsObj => {
        this.GoodsInfo=goodsObj
        // console.log(this.GoodsInfo);
        this.setData({
          goodsObj

        })
     })
  },
  handlePrevewImage(e){
    // console.log("点击");
     const urls= this.GoodsInfo.data.message.pics.map(v=>v.pics_mid)
     const current=e.currentTarget.dataset.url 
    wx.previewImage({
      current,
      urls,
    })
  },
  
  // 点击加入购物车
  handleCartAdd(){
    //  console.log("加入");
    // 先获取缓存中的购物出数组
    let cart = wx.getStorageSync("cart")||[];
    
    // 判断  商品对象是否存在于购物车中
       let index=cart.findIndex(v=>v.data.message.goods_id===this.GoodsInfo.data.message.goods_id)
    if(index===-1){
         this.GoodsInfo.num=1;
         this.GoodsInfo.checked=true;
         cart.push(this.GoodsInfo);
      
    }else{
         cart[index].num++;
        
    }
    
   
    // 把购物车重新添加回缓存中
    wx.setStorageSync("cart",cart);
    wx.showToast({
      title:'加入成功',
      icon:'success',
      // 防止用户持续快速点击
      mask:true
    })
  }

});