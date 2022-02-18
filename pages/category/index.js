// pages/category/index.js
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
      // 左侧的菜单数据
      leftMenuList:[],
      //右侧的商品数据
      rightContent:[],
      // 被点击的左侧菜单
      currentIndex:0,
      scrollTop:0
  },
  Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      /*
         1:先判断一下本地储存中有没有旧的数据

         2：没有旧数据  直接发送新请求
         3  有旧数据  同时  旧数据也没有过期  就是用 本地储存的旧数据即可
      */
    //  获取本地储存中的数据（小程序纯在本地储存技术）
        const Cates=wx.getStorageSync("cates");
        if(!Cates){
          this.getCates();
        }else{
          // 有旧数据   定义一个过期时间
          if(Date.now() - Cates.time > 1000 * 10){
            // 重新发送请求
            this.getCates();
          }else{
            // 使用旧数据
            this.Cates=Cates.data;
            //构造左边的大菜单数据
            let leftMenuList =this.Cates.map(v=>v.cat_name)
            //  构造右边的商品数据
            let rightContent=this.Cates[0].children;
             this.setData({
               leftMenuList,
               rightContent
             })
          }
        }
        // this.getCates();
  },
  // 获取分类数据
     getCates(){
            request({url:"/categories"})
            .then(res => {
                   this.Cates=res.data.message;
                  //  把接口的数据存入本地储存中
                  wx.setStorageSync("cates",{time:Date.now(),data:this.Cates})
                  //相当于 ('key',"value")
                   //构造左边的大菜单数据
                   let leftMenuList =this.Cates.map(v=>v.cat_name)
                  //  构造右边的商品数据
                  let rightContent=this.Cates[0].children;
                   this.setData({
                     leftMenuList,
                     rightContent
                   })
              })
     },
    //  点击事件
    handleItemTap(e){
     
           const {index} = e.currentTarget.dataset;
           let rightContent=this.Cates[index].children;
           this.setData({
            currentIndex:index,
             rightContent,
             //  重新设置右侧内容的top值
             scrollTop:0
           })
          

           
    }
  
})