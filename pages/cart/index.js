// pages/cart/index.js
Page({
   
  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },
  onShow(){
        // 获取本地缓存中的收货地址
        const address=wx.getStorageSync("address");
        // 获取缓存中的购物车数据
        const cart=wx.getStorageSync("cart")||[];
        // const allChecked=cart.length?cart.every(v=>v.checked):false;   
        this.setData({
          address
        })                                 
        this.setCart(cart)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
 // 点击收货地址
 handleChooseAddress(){
  // 获取收获地址
  wx.chooseAddress({
    success:(result)=>{
      let address=result;
      address.all=address.provinceName+address.cityName+address.countyName+address.detailInfo;
      
      // 把获取到的收获地址放到本地储存中
      wx.setStorageSync("address",address);
    }
  })
},


// 商品选中事件
handleItemChange(e){
   
   const goods_id=e.currentTarget.dataset.id; 
  //  console.log(goods_id);
  //  获取购物车数组
  let {cart}=this.data;
  // 找到被修改的商品对象
  let index=cart.findIndex(v=>v.data.message.goods_id===goods_id)
  
  cart[index].checked=!cart[index].checked;
  // 把购物车数据重新设置回data和缓存中
  this.setCart(cart)
},
// 设置购物车状态，重新计算底部工具栏的数据  全选 总价格 购买的数量
setCart(cart){
  
 
 
        let allChecked=true;
        // 总价格   总数量
        let totalPrice=0;
        let totalNum=0;
        cart.forEach(v => {
          if(v.checked){
              totalPrice+=v.num*v.data.message.goods_price;
              totalNum+=v.num
          }else{
            allChecked=false;
          }
        });
        allChecked=cart.length!=0?allChecked:false
        this.setData({
          cart,
          totalPrice,
          totalNum,
          allChecked
        });
        wx.setStorageSync("cart",cart);

},
// 商品全选功能
handleItemAllCheck(){
    let {cart,allChecked} = this.data;
    // 修改值
    allChecked=!allChecked;
    
   
    // 循环修改Cart数组  中的商品选中状态
    cart.forEach(v=>v.checked=allChecked);
    // 修改后的值填充回data或者缓存中
    this.setCart(cart);
},
// 商品数量编辑
handleItemNumEdit(e){

  
    const {operation,id} = e.currentTarget.dataset;
    // console.log(operation,id);
    let {cart} = this.data;
    // 找到需要修改的商品的索引
    const index=cart.findIndex(v=>v.data.message.goods_id===id);
    
     if(cart[index].num===1&&operation===-1){
        //  弹窗提示
        wx.showModal({
          title: '提示',
          content: '您是否要删除？',
          success :(res)=>{
            if (res.confirm) {
              cart.splice(index,1);
              this.setCart(cart);
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
               
            }
          }
        })
        
        
     }else{
         // 修改数量
       cart[index].num+=operation;
        // 设置回缓冲和data中
         this.setCart(cart);     
     }
        
},
// 点击结算功能
handlePay(){
   const {address}=this.data;
   if(!address.userName){
    wx.showModal({
      title: '提示',
      content: '您还没有选择收获地址',
      
    })
    return;
   }
   if(this.data.totalNum===0){
    wx.showModal({
      title: '提示',
      content: '您还没有选购商品',
      
    })
    return;
   }

   wx.navigateTo({
     url:'/pages/pay/index'
   })
}
  
})