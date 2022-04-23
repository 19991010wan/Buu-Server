const app=getApp()

Page({ 
  data: { 
    stunum: '', 
    password:'' 
  }, 
  
  // 获取输入账号 
  stunumInput :function (e) { 
    this.setData({ 
      stunum:e.detail.value 
    }) 
  }, 
  
  // 获取输入密码 
  passwordInput :function (e) { 
    this.setData({ 
      password:e.detail.value 
    }) 
  }, 
  
  // 登录 
  login: function () {
    let that=this
    // const {stunum,password}=this.data
    console.log(that.data.stunum,that.data.password)
    // let stun=this.data.stunum
    // let passwrd=this.data.password
    if(this.data.stunum.length == 0 || this.data.password.length == 0){ 
      wx.showToast({
        title: '账号密码不能空', 
        icon: 'loading', 
        duration: 500 
    }) 
    }else { 
      if(this.data.stunum==='201701'&&this.data.password==='666666'){
        app.globalData.login_index=1
        wx.navigateTo({
          url: '../add_sociatyinfor/add_sociatyinfor',
        })
      }
      else if(this.data.stunum==="201702"&&this.data.password==="666666"){
        app.globalData.login_index=2
        wx.navigateTo({
          url: '../add_sociatyinfor/add_sociatyinfor',
        })
      }
      else if(that.data.stunum==="201703" && that.data.password==="666666"){
        app.globalData.login_index=3
        wx.navigateTo({
          url: '/pages/add_sociatyinfor/add_sociatyinfor',
        })
      }
      else if(that.data.stunum==="201704"&&that.data.password==="666666"){
        app.globalData.login_index=4
        wx.navigateTo({
          url: '../add_sociatyinfor/add_sociatyinfor',
        })
      }
      else if(that.data.stunum==="201705"&&that.data.password==="666666"){
        app.globalData.login_index=5
        wx.navigateTo({
          url: '../add_sociatyinfor/add_sociatyinfor',
        })
      }
      else{
        wx.showToast({
          title: '账号或密码错误',
          icon: 'none',
          duration: 1500,
        })
      }
    } 
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