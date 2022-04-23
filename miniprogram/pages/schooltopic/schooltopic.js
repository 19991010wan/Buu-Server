// pages/schooltopic/schooltopic.js
const db = wx.cloud.database().collection("school_topic")
const app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list_0:[],
    list_1:[],
    list_2:[],
    list_3:[],
    list_4:[],
    list_5:[],
    list_6:[],

    navbar: ['全部', '吐槽', '英语','考试','八卦','游戏','其他'],
    currentTab: 0
  },

  navbarTap: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  add_topic :function(){
    wx.navigateTo({
      url: '/pages/add_topic/add_topic',
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
    db.orderBy('createTime','desc').get({
      success(res){
        console.log("查询成功",res)
        wx.setStorage({
          data: res.data,
          key: 'list_0_schooltopic',
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
    db.orderBy('createTime','desc').where({leixing:"吐槽"}).get({
      success(res){
        console.log("查询成功",res)
        wx.setStorage({
          data: res.data,
          key: 'list_1_schooltopic',
        })
        that.setData({
          list_1:res.data,
        })
        // this.setData({    //收集数据到ne中并返回
        //   topic: res.data
        // })
      },
      fail(res) {
        console.log("查询失败", res)
      }
    })
    db.orderBy('createTime','desc').where({leixing:"英语"}).get({
      success(res){
        console.log("查询成功",res)
        wx.setStorage({
          data: res.data,
          key: 'list_2_schooltopic',
        })
        that.setData({
          list_2:res.data,
        })
        // this.setData({    //收集数据到ne中并返回
        //   topic: res.data
        // })
      },
      fail(res) {
        console.log("查询失败", res)
      }
    })
    db.orderBy('createTime','desc').where({leixing:"考试"}).get({
      success(res){
        console.log("查询成功",res)
        wx.setStorage({
          data: res.data,
          key: 'list_3_schooltopic',
        })
        that.setData({
          list_3:res.data,
        })
        // this.setData({    //收集数据到ne中并返回
        //   topic: res.data
        // })
      },
      fail(res) {
        console.log("查询失败", res)
      }
    })
    db.orderBy('createTime','desc').where({leixing:"八卦"}).get({
      success(res){
        console.log("查询成功",res)
        wx.setStorage({
          data: res.data,
          key: 'list_4_schooltopic',
        })
        that.setData({
          list_4:res.data,
        })
      },
      fail(res) {
        console.log("查询失败", res)
      }
    })
    db.orderBy('createTime','desc').where({leixing:"游戏"}).get({
      success(res){
        console.log("查询成功",res)
        wx.setStorage({
          data: res.data,
          key: 'list_5_schooltopic',
        })
        that.setData({
          list_5:res.data,
        })
      },
      fail(res) {
        console.log("查询失败", res)
      }
    })
    db.orderBy('createTime','desc').where({leixing:"其他"}).get({
      success(res){
        console.log("查询成功",res)
        wx.setStorage({
          data: res.data,
          key: 'list_6_schooltopic',
        })
        that.setData({
          list_6:res.data,
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
    if(app.globalData.ifrefresh_schooltopic===true){
      this.showinfor()
      app.globalData.ifrefresh_schooltopic=false
    }
    else{
      wx.getStorage({
        key: 'list_0_schooltopic',
        success: (res) => {
          this.setData({
            list_0:res.data
          })
        }
      })
      wx.getStorage({
        key: 'list_1_schooltopic',
        success: (res) => {
          this.setData({
            list_1:res.data
          })
        }
      })
      wx.getStorage({
        key: 'list_2_schooltopic',
        success: (res) => {
          this.setData({
            list_2:res.data
          })
        }
      })
      wx.getStorage({
        key: 'list_3_schooltopic',
        success: (res) => {
          this.setData({
            list_3:res.data
          })
        }
      })
      wx.getStorage({
        key: 'list_4_schooltopic',
        success: (res) => {
          this.setData({
            list_4:res.data
          })
        }
      })
      wx.getStorage({
        key: 'list_5_schooltopic',
        success: (res) => {
          this.setData({
            list_5:res.data
          })
        }
      })
      wx.getStorage({
        key: 'list_6_schooltopic',
        success: (res) => {
          this.setData({
            list_6:res.data
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
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    setTimeout(function()
    {
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