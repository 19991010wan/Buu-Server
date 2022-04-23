//获取应用实例
const db = wx.cloud.database().collection("socity_infor")
const app = getApp()

Page({
    data: {
        list_0:[],
        list_1:[],
        list_2:[],
        list_3:[],
        list_4:[],
        list_5:[],
        navData:[
            {
                text: '学生会'
            },
            {
                text: '校青协'
            },
            {
                text: '校科协'
            },
            {
                text: '校团委'
            },
            {
                text: '护旗队'
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
    },

    add_infor :function(){
      wx.navigateTo({
        url: '/pages/add_sociatyinfor/add_sociatyinfor',
      })
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.showinfor()
    },

    showinfor:function(){
      let that=this
      db.orderBy('createTime','desc').where({leixing:"stu-union"}).get({
        success(res){
          console.log("查询成功",res)
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
      db.orderBy('createTime','desc').where({leixing:"stu-hkfyg"}).get({
        success(res){
          console.log("查询成功",res)
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
      db.orderBy('createTime','desc').where({leixing:"stu-science"}).get({
        success(res){
          console.log("查询成功",res)
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
      db.orderBy('createTime','desc').where({leixing:"stu-committee"}).get({
        success(res){
          console.log("查询成功",res)
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
      db.orderBy('createTime','desc').where({leixing:"stu-Guard"}).get({
        success(res){
          console.log("查询成功",res)
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
