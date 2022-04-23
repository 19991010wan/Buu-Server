// pages/add_sociatyinfor/add_sociatyinfor.js
const db = wx.cloud.database()
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    leixing:"",
    title:'',
    textVal_neirong:"",//text文本内容
    textVal_biaoti:"",//text标题内容
  },

  handletext_biaotiinput:function(e){
    this.setData({
      textVal_biaoti:e.detail.value
    })
  },

  //获取textarea文本内容
  handletext_neironginput:function(e){
    this.setData({
      textVal_neirong:e.detail.value
    })
  },

  loginback:function(){
    app.globalData.login_index=0
    wx.navigateTo({
      url: '/pages/sociaty-infor/sociaty-infor',
    })
  },

  add:function(){
    if(app.globalData.login_index==1){
      this.data.leixing="stu-union"
    }
    else if(app.globalData.login_index==2){
      this.data.leixing="stu-hkfyg"
    }
    else if(app.globalData.login_index==3){
      this.data.leixing="stu-science"
    }
    else if(app.globalData.login_index==4){
      this.data.leixing="stu-committee"
    }
    else if(app.globalData.login_index==5){
      this.data.leixing="stu-Guard"
    }
    const {textVal_biaoti,textVal_neirong}=this.data;
    if(!textVal_biaoti.trim()){
      wx.showToast({
        title: '标题输入不合法',
        icon:'none',
        mask:true
      })
    }
    else if(!textVal_neirong.trim()){
      wx.showToast({
        title: '内容输入不合法',
        icon:'none',
        mask:true
      })
    }
    else{
      wx.getStorage({
        key: 'userinfor',
        success: (res) => {
          var data={
            leixing:"stu-union",
            title:this.data.textVal_biaoti,
            info:this.data.textVal_neirong,
            avatar:res.data.avatarUrl,
            uName:res.data.nickName,
            comments:[],
            createTime:db.serverDate()
          }
          db.collection("socity_infor").add({
            data: data,
            success:res => {
              wx.showToast({
                title: '发布成功',
              })
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
        },
        fail: (res) => {},
        complete: (res) => {},
      })
    }
  },

  fb:function(){
    const {textVal_biaoti,textVal_neirong}=this.data;
    wx.cloud.callFunction({
      name: 'msgcheck',
      data: {
        text: textVal_biaoti,textVal_neirong
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
          textVal_biaoti:"",
          textVal_neirong:""
        })
      }
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
    if(app.globalData.login_index==1){
      this.data.title='学生会发布消息'
    }
    else if(app.globalData.login_index==2){
      this.data.title='校青协发布消息'
    }
    else if(app.globalData.login_index==3){
      this.data.title='校科协发布消息'
    }
    else if(app.globalData.login_index==4){
      this.data.title='校团委发布消息'
    }
    else if(app.globalData.login_index==5){
      this.data.title='护旗队发布消息'
    }
    wx.setNavigationBarTitle({
      title:this.data.title
    })
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