// pages/mailbox/mailbox.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
email:[],// 邮件
email_nums:0//邮件初始数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.deleteFile({
      fileList: ['cloud://wanzhijie19991010-1ej2hmc1cd3bcc.7761-wanzhijie19991010-1ej2hmc1cd3bcc-1304947098/ad-left.jpg'],
      success: res => {
        // handle success
        console.log(res.fileList)
      },
      fail: err => {
        // handle error
      },
      complete: res => {
        // ...
      }
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading({
      title: '刷新中！',
      duration: 1000
    })
    
    let x = this.data.email_nums + 20
    console.log(x)
    let old_data = this.data.email
    db.collection('mail').orderBy('time','desc').skip(x) // 限制返回数量为 20 条
      .get()
      .then(res => {
       // 这里是从数据库获取文字进行转换 变换显示（换行符转换） 
        res.data.forEach((item, i) => {
          res.data[i].content = res.data[i].content.split('*hy*').join('\n');
        })
      
      // 利用concat函数连接新数据与旧数据
      // 并更新emial_nums  
        this.setData({
          email: old_data.concat(res.data),
          email_nums: x
        })
        console.log(res.data)
      })
      .catch(err => {
        console.error(err)
      })
    console.log('circle 下一页');
  
  },
})
