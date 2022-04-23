//获取应用实例
const app = getApp()
const db = wx.cloud.database().collection("infor_share")

Page({
    data: {
        // motto: 'Hello World',
        // userInfo: {},
        // hasUserInfo: false,
        // canIUse: wx.canIUse('button.open-type.getUserInfo'),
        navData:[
          {
              text: '全部'
          },
          {
              text: '高数'
          },
          {
              text: '考研'
          },
          {
              text: '四六级'
          },
          {
              text: '软件'
          },
          {
              text: '影视'
          }
        ],
        currentTab: 0,
        navScrollLeft: 0
    },
    //事件处理函数
    onLoad: function () {
        
    },
    switchNav(event){
        var cur = event.currentTarget.dataset.current; 
        //每个tab选项宽度占1/5
        var singleNavWidth = this.data.windowWidth / 5;
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
        var singleNavWidth = this.data.windowWidth / 5;
        this.setData({
            currentTab: cur,
            navScrollLeft: (cur - 2) * singleNavWidth
        });
    },add_infor :function(){
      wx.navigateTo({
        url: '/pages/add_infor/add_infor',
      })
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
      let that=this
      const {currentTab}=this.data
      console.log(currentTab)
      if(currentTab==0){
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
      }
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
