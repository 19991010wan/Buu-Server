//获取应用实例
const app = getApp()
const db = wx.cloud.database().collection("infor_share")
let ID=''

Page({
    data: {
        list_0:[],
        list_1:[],
        list_2:[],
        list_3:[],
        list_4:[],
        list_5:[],
        list_6:[],
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
    },
    
    add_infor :function(){
      wx.navigateTo({
        url: '/pages/shiyan7/shiyan7',
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
      // wx.cloud.callFunction({
      //   name:"list",
      //   data:{
      //     action:"send_inforshare",
      //     id:ID,
      //   }
      // }).then(res=>{
      //   console.log("发表成功",res)
      //   this.setData({
      //     comments:res.data
      //   })
      // }).catch(res=>{
      //   console.log("发表失败",res)
      // })
      // this.showinfor()
      
    },

    showinfor:function(){
      let that=this
      db.orderBy('createTime','desc').get({
        success(res){
          console.log("查询成功",res)
          wx.setStorage({
            data: res.data,
            key: 'list_0_info',
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
      db.orderBy('createTime','desc').where({leixing:"高数"}).get({
        success(res){
          console.log("查询成功",res)
          wx.setStorage({
            data: res.data,
            key: 'list_1_info',
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
      db.orderBy('createTime','desc').where({leixing:"考研"}).get({
        success(res){
          console.log("查询成功",res)
          wx.setStorage({
            data: res.data,
            key: 'list_2_info',
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
      db.orderBy('createTime','desc').where({leixing:"四六级"}).get({
        success(res){
          console.log("查询成功",res)
          wx.setStorage({
            data: res.data,
            key: 'list_3_info',
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
      db.orderBy('createTime','desc').where({leixing:"软件"}).get({
        success(res){
          console.log("查询成功",res)
          wx.setStorage({
            data: res.data,
            key: 'list_4_info',
          })
          that.setData({
            list_4:res.data,
          })
          // this.setData({    //收集数据到ne中并返回
          //   topic: res.data
          // })
        },
        fail(res) {
          console.log("查询失败", res)
        }
      })
      db.orderBy('createTime','desc').where({leixing:"影视"}).get({
        success(res){
          console.log("查询成功",res)
          wx.setStorage({
            data: res.data,
            key: 'list_5_info',
          })
          that.setData({
            list_5:res.data,
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
    if(app.globalData.ifrefresh===true){
      this.showinfor()
      app.globalData.ifrefresh=false
    }
    else{
      wx.getStorage({
        key: 'list_0_info',
        success: (res) => {
          this.setData({
            list_0:res.data
          })
        }
      })
      wx.getStorage({
        key: 'list_1_info',
        success: (res) => {
          this.setData({
            list_1:res.data
          })
        }
      })
      wx.getStorage({
        key: 'list_2_info',
        success: (res) => {
          this.setData({
            list_2:res.data
          })
        }
      })
      wx.getStorage({
        key: 'list_3_info',
        success: (res) => {
          this.setData({
            list_3:res.data
          })
        }
      })
      wx.getStorage({
        key: 'list_4_info',
        success: (res) => {
          this.setData({
            list_4:res.data
          })
        }
      })
      wx.getStorage({
        key: 'list_5_info',
        success: (res) => {
          this.setData({
            list_5:res.data
          })
        }
      })
    }
    // setTimeout(()=>{
    //   this.showinfor()
    // },30000)
    // this.showinfor()
    // wx.getStorage({
    //   key: 'list_0_info',
    //   success: (res) => {
    //     this.setData({
    //       list_0:res.data
    //     })
    //   }
    // })
    
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
