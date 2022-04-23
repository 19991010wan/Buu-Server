// pages/schoolmates/schoolmates.js
const db = wx.cloud.database().collection("school_share")
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [],
    lists_1:[],

    navData:[
      {
          text: '分享'
      },
      {
          text: '聊天'
      },
      {
          text: '我的'
      }
    ],
    currentTab: 0,
    navScrollLeft: 0,

    userInfo: '',
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
  
  },

  toChat: function () {
    wx.navigateTo({
      url: '../room/room'
    })
  },

  //进入详情
  detail: function (e) {
    // console.log(e.currentTarget.dataset.item)
    console.log(e.currentTarget.dataset.title)
    wx.navigateTo({
      url: '../detail_schoolshare/detail_schoolshare?title=' + e.currentTarget.dataset.title + '&id=' + e.currentTarget.dataset.item._id
    })
  },

  switchNav(event){
    var cur = event.currentTarget.dataset.current; 
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 3;
    //tab选项居中    
    this.setData({
        navScrollLeft: (cur - 2) * singleNavWidth
    })      
    if (this.data.currentTab == cur) {
        return false;
    } else {
        this.setData({
            currentTab: cur
        })
    }
  },
  switchTab(event){
      var cur = event.detail.current;
      var singleNavWidth = this.data.windowWidth / 3;
      this.setData({
          currentTab: cur,
          navScrollLeft: (cur - 2) * singleNavWidth
      });
  },

  add_infor :function(){
    wx.navigateTo({
      url: '/pages/add_schoolshare/add_schoolshare',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {currentTab}=this.data
    console.log(currentTab)
    wx.getStorage({
      key: 'userinfor',
      success: (res) => {
        this.setData({
          userInfo: res.data
        })
      },
      fail: (res) => {},
      complete: (res) => {},
    })
    // this.showinfor()
  },

  showinfor:function(){
    let that=this
    let openid=app.globalData.openid
    db.orderBy('createTime','desc').get({
      success(res){
        console.log("查询成功",res)
        wx.setStorage({
          data: res.data,
          key: 'lists_schoolshare',
        })
        that.setData({
          lists:res.data
        })
      },
      fail(res) {
        console.log("查询失败", res)
      }
    })
    db.orderBy('createTime','desc').where({_openid:openid}).get({
      success(res){
        console.log("查询成功",res)
        wx.setStorage({
          data: res.data,
          key: 'lists_1_schoolshare',
        })
        that.setData({
          lists_1:res.data
        })
        // this.setData({    //收集数据到ne中并返回
        //   topic: res.data
        // })
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
    if(app.globalData.ifrefresh_schoolshare===true){
      this.showinfor()
      app.globalData.ifrefresh_schoolshare=false
    }
    else{
      wx.getStorage({
        key: 'lists_schoolshare',
        success: (res) => {
          this.setData({
            lists:res.data
          })
        }
      })
      wx.getStorage({
        key: 'lists_1_schoolshare',
        success: (res) => {
          this.setData({
            lists_1:res.data
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