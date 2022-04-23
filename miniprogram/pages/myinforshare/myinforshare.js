//获取应用实例
const app = getApp()
const db = wx.cloud.database().collection("infor_share")

Page({
    data: {
        list_0:[],
    },
  
    click: function (e) { 
      console.log(e.currentTarget.dataset.leixing)
      wx.navigateTo({
        url: '../detail_Informationcommen/detail_Informationcommen?title=' + e.currentTarget.dataset.leixing + '&id=' + e.currentTarget.dataset.item._id
      })
    },
  
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      // this.showinfor()
      
    },

    showinfor:function(){
      let that=this
      let openid=app.globalData.openid
      db.orderBy('createTime','desc').where({_openid:openid}).get({
        success(res){
          console.log("查询成功",res)
          wx.setStorage({
            data: res.data,
            key: 'list_myinforshare',
          })
          that.setData({
            list_0:res.data
          })
        },
        fail(res) {
          console.log("查询失败", res)
        }
      })
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
    if(app.globalData.ifmyinforrefresh===true){
      this.showinfor()
      app.globalData.ifmyinforrefresh=false
    }
    else{
      wx.getStorage({
        key: 'list_myinforshare',
        success: (res) => {
          this.setData({
            list_0:res.data
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
