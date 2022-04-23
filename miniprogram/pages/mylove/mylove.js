// pages/loveexpress/loveexpress.js
const db = wx.cloud.database().collection("love_express")
const app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[],

      
      
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
    if(app.globalData.ifmyloverefresh===true){
      let that=this
      let openid=app.globalData.openid
      db.orderBy('createTime','desc').where({_openid:openid}).get({
        success(res){
          console.log("查询成功",res)
          wx.setStorage({
            data: res.data,
            key: 'list_mylove',
          })
          that.setData({
            list:res.data
          })
        },
        fail(res) {
          console.log("查询失败", res)
        }
      })
      app.globalData.ifmyloverefresh=false
    }
    else{
      wx.getStorage({
        key: 'list_mylove',
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
    // wx.startPullDownRefresh()
    // wx.stopPullDownRefresh()
    console.log('--------下拉刷新-------')
　　wx.showNavigationBarLoading() //在标题栏中显示加载

    setTimeout(function()
    {
      db.orderBy('createTime','desc').get({
        success(res){
          console.log("查询成功",res)
          that.setData({
            list:res.data
          })
          // this.setData({    //收集数据到ne中并返回
          //   topic: res.data
          // })
        },
        fail(res) {
          console.log("查询失败", res)
        }
      })
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    },1500);
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