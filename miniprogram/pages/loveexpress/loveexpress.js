// pages/loveexpress/loveexpress.js
const db = wx.cloud.database().collection("love_express")
const app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[],
      list_1:[],

      indicatorDots: true,
      vertical: false,
      autoplay: true,
      interval: 3000,
      duration: 1200,
      swipers:[{
          image:"http://m.qpic.cn/psc?/V51jU5mU0273mb0IdiHI2S0Nty2Hs3XW/ruAMsa53pVQWN7FLK88i5h27HouX6h0k6aIHe8DLZqFrsD9XhMHcNSNUBCx1gs*OHMGcY9tiH1lbICmiW8rVmR6XGKSKdNQhLhQN7DZhvew!/mnull&bo=oAUqA6AFKgMBCS4!&rf=photolist&t=5"
      },{
          image:"http://m.qpic.cn/psc?/V51jU5mU0273mb0IdiHI2S0Nty2Hs3XW/ruAMsa53pVQWN7FLK88i5h27HouX6h0k6aIHe8DLZqE1uhRJJCUGUyYPjWZ4HwNQI9xzI7zn.SrhLRlt.Ghn8PQ8kpLDYc3tRPlQxwjpkiE!/mnull&bo=kAElAZABJQEBCS4!&rf=photolist&t=5"
      },{
          image:"http://m.qpic.cn/psc?/V51jU5mU0273mb0IdiHI2S0Nty2Hs3XW/ruAMsa53pVQWN7FLK88i5r1KJ2awsW19L5oHTgpnrkSToU4wJAKv9Ecx4.5vJDH2UNYU4vpOaSiZejzLD1s788s1IOBlYXkWiYyUgXWOzaY!/mnull&bo=9AEwAfQBMAEDCSw!&rf=photolist&t=5"
      }
      ],
      
  },

  add_topic :function(){
    wx.navigateTo({
      url: '/pages/add_love/add_love',
    })
  },

  click: function (e) { 
    console.log(e.currentTarget.dataset.leixing)
    wx.navigateTo({
      url: '../detail_love/detail_love?id=' + e.currentTarget.dataset.item._id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(app.globalData.ifrefresh_love===true){
      let that=this
      db.orderBy('createTime','desc').get({
        success(res){
          console.log("查询成功",res)
          wx.setStorage({
            data: res.data,
            key: 'list_love',
          })
          that.setData({
            list:res.data
          })
        },
        fail(res) {
          console.log("查询失败", res)
        }
      })
      app.globalData.ifrefresh_love=false
    }
    else{
      wx.getStorage({
        key: 'list_love',
        success: (res) => {
          this.setData({
            list:res.data
          })
        }
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    setTimeout(function()
    {
      // let that=this
      // db.orderBy('createTime','desc').get({
      //   success(res){
      //     console.log"查询成功",res)
      //     this.setData({
      //       list:res.data
      //     })
      //     console.log("list是",this.data.list)
      //   },
      //   fail(res) {
      //     console.log("查询失败", res)
      //   }
      // })
      // list:list_1
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    },1500);
    // wx.startPullDownRefresh()
    // wx.showNavigationBarLoading() //在标题栏中显示加载
    
    // wx.stopPullDownRefresh()
    console.log('--------下拉刷新-------')
　　
    // let list_1=this.data.list_1

    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})