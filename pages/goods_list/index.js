// pages/goods_list/index.js
import { request } from "../../request/index.js";
Page({

  data: {
      tabs:[
        {
          id:0,
          value:"综合",
          isActive:true
        },
        {
          id:1,
          value:"销量",
          isActive:false
        },
        {
          id:2,
          value:"价格",
          isActive:false
        }
      ],
      goodsList:[]
  },
QueryParams:{
  query:"",
  cid:"",
  pagenum:1,
  pagesize:10
},
totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        // console.log(options);
        this.QueryParams.cid=options.cid;
        this.getGoodsList();
  },
  
  //获取商品列表数据
  getGoodsList(){
    request({url:"/goods/search",data:this.QueryParams})
    
    .then(res => {
        // console.log(res.data.message.goods);

        const total=res.data.message.total;
        this.totalPages=Math.ceil(total/this.QueryParams.pagesize);
        

      this.setData({
        goodsList:[...this.data.goodsList,...res.data.message.goods]
      })
    })
    wx.stopPullDownRefresh();
  },
  handleItemChange(e){
    // console.log(e);
    const {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },
  onReachBottom(){
    if(this.QueryParams.pagenum>=this.totalPages){
       wx.showToast({title:'没有下一页数据了'})
    }else{
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },
  // 下拉刷新事件
  onPullDownRefresh(){
    //  重置数组
    this.setData({
      goodsList:[]
    })
    // 重置页码
    this.QueryParams.pagenum=1;
    this.getGoodsList();
  }

})