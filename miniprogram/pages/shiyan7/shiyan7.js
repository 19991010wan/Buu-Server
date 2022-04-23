// pages/add_infor/add_infor.js
const db = wx.cloud.database();
const app = getApp();
var msgSC=Boolean();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    textVal:"",//text文本内容

    shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectDatas: ['高数', '考研', '四六级','软件','影视'], //下拉列表的数据
    indexs: 0, //选择的下拉列表下标
  },

  // 点击下拉显示框
  selectTaps() {
    this.setData({
      shows: !this.data.shows,
    });
  },
  
  // 点击下拉列表
  optionTaps:function(e) {
    let Indexs = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    app.globalData.index_=Indexs;
    // indexs=app.globalData
    // console.log(Indexs)
    this.setData({
      indexs: Indexs,
      shows: !this.data.shows
    });
    console.log(app.globalData.index_)
  },

  //获取textarea文本内容
  handletextinput:function(e){
    this.setData({
      textVal:e.detail.value
    })
  },

  add:function(){
    var selectDatas=['高数', '考研', '四六级','软件','影视']; //下拉列表的数据
    const {textVal}=this.data;
    if(!textVal.trim()){
      wx.showToast({
        title: '输入不合法',
        icon:'none',
        mask:true
      })
    }
    else{
      wx.getStorage({
        key: 'userinfor',
        success: (res) => {
          var data={
            uName:res.data.nickName,
            avatar:res.data.avatarUrl,
            leixing:selectDatas[app.globalData.index_],
            textVal:this.data.textVal,
            comments:[],
            createTime:db.serverDate()
          }
          db.collection("infor_share").add({
            data: data,
            success:res => {
              wx.showToast({
                title: '发布成功',
              })
              app.globalData.ifrefresh=true
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