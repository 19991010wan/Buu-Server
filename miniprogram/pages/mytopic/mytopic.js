// pages/schooltopic/schooltopic.js
const db = wx.cloud.database().collection('school_topic')
const _ = db.command
const app=getApp()
let IdS=[]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list_0:[],

    management_luntan:false,
    select_all:false,
    middlearr:[],
    ifdelete:false,//判断是否删除
  },

  // 管理商品
  management:function(){
    let that = this;
    that.setData({
      management_luntan: true,
    })
  },
  finish_management:function(){
    let that = this;
    that.setData({
      management_luntan:false,
    })
    if(that.data.ifdelete===false){
      wx.removeStorage({
        key: 'list_0_mytopic',
      })
      console.log("没删除")
      var aar
      wx.getStorage({
        key: 'list_1_mytopic',
        success: (res) => {
          aar=res.data
          wx.setStorage({
            data: aar,
            key: 'list_0_mytopic',
          })
          wx.getStorage({
            key: 'list_0_mytopic',
            success: (res) => {
              var aarr
              aarr=res.data
              that.setData({
                list_0: aarr,
                select_all: false,
                middlearr:[]
              })
              // console.log("2222",that.data.list_0)
            }
          })
        }
      })
    }
  },

  // 选择
  select:function(e){
    var that = this;
    let arr2 = [];
    if (that.data.management_luntan == false){
       return;
    }else{
      var ar
      wx.getStorage({
        key: 'list_0_mytopic',
        success: (res) => {
          ar=res.data
          let arr = ar;
          var index = e.currentTarget.dataset.id;
          console.log("在这里",arr[index])
          arr[index].checked = !arr[index].checked;
          console.log(arr);

          for(let i=0;i<arr.length;i++){
            if(arr[i].checked){
              arr2.push(arr[i])
            }
          };

          wx.setStorage({
            data: arr,
            key: 'list_0_mytopic',
          })
          
          that.setData({
            list_0: arr,
            middlearr:arr2
          })
        }
      })
      
    }
  },

  // 全选
  select_all:function(){
    let that = this;
    that.setData({
      select_all: !that.data.select_all
    })
    if (that.data.select_all){
      var ar
      wx.getStorage({
        key: 'list_0_mytopic',
        success: (res) => {
          ar=res.data
          let arr = ar;
          let arr2 = [];
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].checked == true) {
              arr2.push(arr[i]);
            }else{
              arr[i].checked = true;
              arr2.push(arr[i]);
            }
          }
          wx.setStorage({
            data: arr2,
            key: 'list_0_mytopic',
          })
          that.setData({
            list_0: arr2,
            middlearr:arr2
          })
        }
      })
    }
  },
  // 取消全选
  select_none:function(){
    let that = this;
    that.setData({
      select_all: !that.data.select_all
    })
    var ar
    wx.getStorage({
      key: 'list_0_mytopic',
      success: (res) => {
        ar=res.data
        let arr = ar;
        let arr2 = [];
        for (let i = 0; i < arr.length; i++) {
            arr[i].checked = false;
            arr2.push(arr[i]);
        }
        wx.setStorage({
          data: arr2,
          key: 'list_0_mytopic',
        })
        that.setData({
          list_0: arr2,
          middlearr:[]
        })
      }
    })
    
  },

  // 删除
  deleteitem:function(){
    var that = this;
    wx.getStorage({
      key: 'list_0_mytopic',
      success: (res) => {
        let ar=res.data
        let arr = ar;
        let arr2 = [];
        let arr3 = [];
        console.log(arr);
        for(let i=0;i<arr.length;i++){
          if (arr[i].checked == false){
            arr2.push(arr[i]);
          }
          if (arr[i].checked == true){
            arr3.push(arr[i]);
          }
        }

        for(let i=0;i<arr3.length;i++){
          IdS[i]=arr3[i]._id
        }
        console.log("删除的_id是",IdS)
        for(let i=0;i<IdS.length;i++){
          db.doc(IdS[i]).get({
            success(res){
              console.log("删除的图片路径",res.data.imurl_0)
              
              if(res.data.imurl_0){
                for(let i=0;i<res.data.imurl_0.length;i++){
                  wx.cloud.deleteFile({
                    fileList: [res.data.imurl_0[i]],
                    success: res => {
                      // handle success
                      console.log(res.fileList)
                      console.log("云存储中图片删除成功")
                    },
                    fail: err => {
                      // handle error
                    },
                    complete: res => {
                      // ...
                    }
                  })
                }
              }
              else return
            },
            fail(res) {
              console.log("查询失败", res)
            }
          })
        }
        for(let i=0;i<IdS.length;i++){
          db.doc(IdS[i])
          .remove({
            success: res => {
            },
            fail: err => {
              console.error('[数据库] [删除记录] 失败：', err)
            }
          })
        }
        

        // wx.cloud.callFunction({
        //   name:"delete_mine",
        //   data:{
        //     action:"delete_mytopic",
        //     idS:IdS,
        //   }
        // }).then(res=>{
        //   console.log("删除成功",res)
        // }).catch(res=>{
        //   console.log("删除失败",res)
        // })

        wx.setStorage({
          data: arr2,
          key: 'list_0_mytopic',
        })
        wx.setStorage({
          data: arr2,
          key: 'list_1_mytopic',
        })
        that.setData({
          list_0:arr2,
          middlearr:[]
        })
      }
    })
    // that.data.ifdelete=true
    that.setData({
      ifdelete: true
    })
    app.globalData.ifrefresh_schooltopic=true
  },

  navbarTap: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  click: function (e) { 
    console.log(e.currentTarget.dataset.leixing)
    wx.navigateTo({
      url: '../detail_schooltopic/detail_schooltopic?title=' + e.currentTarget.dataset.leixing + '&id=' + e.currentTarget.dataset.item._id
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
          key: 'list_0_mytopic',
        })
        wx.setStorage({
          data: res.data,
          key: 'list_1_mytopic',
        })
        that.setData({
          list_0:res.data
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
    if(app.globalData.ifmytopicrefresh===true){
      this.showinfor()
      app.globalData.ifmytopicrefresh=false
    }
    else{
      wx.getStorage({
        key: 'list_0_mytopic',
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