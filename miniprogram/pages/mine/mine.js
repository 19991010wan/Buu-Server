const app = getApp()

Page({
  data: {
    bannerSrc:"http://m.qpic.cn/psc?/V51jU5mU0273mb0IdiHI2S0Nty2Hs3XW/ruAMsa53pVQWN7FLK88i5hevesCFCCnSbtnMMCHAHXC6KZpj32nvTTcrGnwDhIuF4qpdk*76gX8Jm2ETkbCnrr*7kbkxF0fGOYENNVS6kjA!/mnull&bo=kAHhAJAB4QABCS4!&rf=photolist&t=5",
    

    username:"用户登录",
    avatarUrl: '/images/avatarUrl.png'
  },
  onLoad: function () {

  },
  onShow:function(){
    wx.getStorage({
      key: 'userinfor',
      success: (res) => {
        this.setData({ // 解决第二次点击tabBar页面不刷新问题
          username: res.data.nickName,
          avatarUrl: res.data.avatarUrl,
        })
      },
      fail: (res) => {},
      complete: (res) => {},
    })
    console.log(this.data.username)
  },
  
  next1:function(){
    console.log('next1')
    wx.switchTab({ //tabBar页面跳转
      url: '../index/index',
    })
  },

  next2:function(){
    console.log('next2')
    wx.navigateTo({ //tabBar页面跳转
      url: '../mytopic/mytopic',
    })
  },

  next3:function(){
    console.log('next3')
    wx.navigateTo({ //tabBar页面跳转
      url: '../mylove/mylove',
    })
  },

  next4:function(){
    console.log('next4')
    wx.navigateTo({ //tabBar页面跳转
      url: '../myinforshare/myinforshare',
    })
  },
  /**
* 用户点击右上角分享
*/
  onShareAppMessage() {
    // return {
    //   title: '我的页面'//分享内容
    //   // path: '/pages/my/my'//分享地址
    // }
  }
})