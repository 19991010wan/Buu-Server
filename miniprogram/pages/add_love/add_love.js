// pages/add_love/add_love.js
const db = wx.cloud.database();
const app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    textVal:"",//text文本内容
  },

  //获取textarea文本内容
  handletextinput:function(e){
    this.setData({
      textVal:e.detail.value
    })
  },

  add:function(){
    const {textVal}=this.data;
    if(!textVal.trim()){
      wx.showToast({
        title: '输入不合法',
        icon:'none',
        mask:true
      })
    }
    else{
        var data={
          textVal:this.data.textVal,
          comments:[],
          createTime:db.serverDate()
        }
        db.collection('love_express').add({
          data: data,
          success:res => {
            wx.showToast({
              title: '表白成功',
            })
            app.globalData.ifrefresh_love=true
            app.globalData.ifmyloverefresh=true
            setTimeout(()=>{
              this.setData({
                textVal:""
              })
            }, 1000)
          },
          fail: e=>{
            wx.showToast({
              title: '发布错误',
            })
            console.log(e)
          }
        })
    }
  },

   //发布按钮
   fb: function() {
    const {textVal}=this.data;
    wx.cloud.callFunction({
      name: 'msgcheck',
      data: {
        text: textVal
      }
    }).then((res) => {
      if (res.result.code == "200") {
        //检测通过
        console.log("检测通过")
        this.add()
      } else {
        console.log("检测不通过")
        //执行不通过
        wx.showToast({
          title: '包含敏感字哦。',
          icon: 'none',
          duration: 3000
        })
        this.setData({
          textVal:""
        })
      }
    })
    // app.globalData.ifrefresh_love=true
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
    // let that=this
    // that.onLoad();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
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