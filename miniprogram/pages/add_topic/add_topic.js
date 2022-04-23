// pages/add_topic/add_topic.js
const db = wx.cloud.database();
const app = getApp();
// let index_=res.data.Data;
// var index_;
// var img_fileIDs=[];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // upFilesBtn:true,
    // upFilesProgress:false,
    // maxUploadLen:6,

    imgbox: [],//选择图片
    fileIDs: [],//上传云存储后的返回值
    textVal:"",//text文本内容

    shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectDatas: ['吐槽', '英语', '考试','八卦','游戏','其他'], //下拉列表的数据
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


  // 删除照片 &&
  imgDelete1: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgbox = this.data.imgbox;
    imgbox.splice(index, 1)
    that.setData({
      imgbox: imgbox
    });
  },
  // 选择图片 &&&
  addPic1: function () {
    var imgbox = this.data.imgbox;
    console.log(imgbox)
    var that = this;
    var n = 5;
    if (5 > imgbox.length > 0) {
      n = 5 - imgbox.length;
    } else if (imgbox.length == 5) {
      n = 1;
    }
    wx.chooseImage({
      count: n, // 默认9，设置图片张数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths

        if (imgbox.length == 0) {
          imgbox = tempFilePaths
        } else if (5 > imgbox.length) {
          imgbox = imgbox.concat(tempFilePaths);
        }
        that.setData({
          imgbox: imgbox
        });
      }
    })
  },

  //图片
  imgbox: function (e) {
    this.setData({
      imgbox: e.detail.value
    })
  },

  add:function(){
    var selectDatas=['吐槽', '英语', '考试','八卦','游戏','其他']
    console.log(app.globalData.index_)
    // console.log(index_)
     const {textVal}=this.data;
    //  console.log(index,textVal)
    if(!textVal.trim()){
      wx.showToast({
        title: '输入不合法',
        icon:'none',
        mask:true
      })
    }
    else{
      // console.log(app.globalData.openid)
      if (!this.data.imgbox.length) {
        var data={
          leixing:selectDatas[app.globalData.index_],
          textVal:this.data.textVal,
          comments:[],
          checked:false,
          createTime:db.serverDate()
          // username: wx.getStorageSync('userinfo'), //用户名
        }
        db.collection('school_topic').add({
          data: data,
          success:res => {
            wx.showToast({
              title: '发布成功',
            })
            app.globalData.ifrefresh_schooltopic=true
            app.globalData.ifmytopicrefresh=true
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
      } else {
          //上传图片到云存储
          wx.showLoading({
            title: '发布中',
          })
          let promiseArr = [];
          for (let i = 0; i < this.data.imgbox.length; i++) {
            promiseArr.push(new Promise((reslove) => {
              let item = this.data.imgbox[i];
              let suffix = /\.\w+$/.exec(item)[0];//正则表达式返回文件的扩展名
              console.log("扩展名是",suffix)
              wx.cloud.uploadFile({
                cloudPath: 'school_topic-images/'+new Date().getTime() + suffix, // 上传至云端的路径
                filePath: item, // 小程序临时文件路径
                success: res => {
                  this.setData({
                    fileIDs: this.data.fileIDs.concat(res.fileID)
                  });
                  reslove();
                },
                fail: ()=>{
                  wx.hideLoading();
                  wx.showToast({
                    title: "图片上传失败",
                  })
                }
  
              })
            }));
          }
          Promise.all(promiseArr).then(res => {//等数组都做完后做then方法
            // console.log(fileIDs)
            var data={
              imurl_0:this.data.fileIDs,
              leixing:selectDatas[app.globalData.index_],
              textVal:this.data.textVal,
              comments:[],
              checked:false,
              createTime:db.serverDate()
              // username: wx.getStorageSync('userinfo'), //用户名
            }
            db.collection('school_topic').add({
              data: data,
              success:res => {
                wx.showToast({
                  title: '发布成功',
                })
                app.globalData.ifrefresh_schooltopic=true
                app.globalData.ifmytopicrefresh=true
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
          })
          console.log("图片上传完成后再执行")
          this.setData({
            imgbox:[]
          })  
  
        }
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

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