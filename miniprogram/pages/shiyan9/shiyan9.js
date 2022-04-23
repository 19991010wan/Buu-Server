// pages/shiyan9/shiyan9.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  shijiancha: function (faultDate, completeTime) {
      var stime = Date.parse(new Date(faultDate));
      
      var etime = Date.parse(new Date(completeTime));
      
      var usedTime = etime - stime; //两个时间戳相差的毫秒数
      
      var days = Math.floor(usedTime / (24 * 3600 * 1000));
      
      //计算出小时数
      
      var leave1 = usedTime % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
      
      var hours = Math.floor(leave1 / (3600 * 1000));
      
      //计算相差分钟数
      
      var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
      
      var minutes = Math.floor(leave2 / (60 * 1000));
      
       
      
      var dayStr = days == 0 ? "" : days + "天";
      
      var hoursStr = hours == 0 ? "" : hours + "时";
      
       
      
      var time = dayStr + hoursStr + minutes + "分";
      
      return time;
    
    },

    // let param=  {pageIndex: this.data.pageIndex};
    // var that = this;
    // app.HttpClient.request(url, param, function(res){
    //   let list = res.data;
    //   let index = that.data.serviceList.length;
    //   let data = that.data;  
    //   list.forEach((item)=>{
    //     data['serviceList[' + (index++) + ']'] = item;
    //   });
    //   that.setData(data);
    // })
    
     
    
     
    
     
    
    onLoad: function(options) {
      let aa ="2019-05-22 16:42:59";
      
      let bb = "2019-05-22 18:34:59";
      var time=this.shijiancha(aa, bb)
      console.log(time);
    
    },

    // wx.getSetting({
    //   success(res) {
    //     if (!res.authSetting['scope.writePhotosAlbum']) {
    //     wx.authorize({
    //       scope:'scope.writePhotosAlbum',
    //       success() {
    //         console.log('授权成功')
    //       }
    //     })
    //     }
    //   }
    // })
    // var imgSrc = imgFileID
    // console.log("图片路径是",imgSrc)
    // wx.downloadFile({
    //   url: imgSrc,
    //   success: function (res) {
    //     console.log(res);
    //     //图片保存到本地
    //     // console.log("开始保存了111111")
    //     wx.saveImageToPhotosAlbum({
    //       filePath: res.tempFilePath,
    //       success: function (data) {
    //         wx.showToast({
    //           title: '保存成功',
    //           icon: 'success',
    //           duration: 2000
    //         })
    //       },
    //       fail: function (err) {
    //         console.log(err);
    //         if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
    //           console.log("当初用户拒绝，再次发起授权")
    //           wx.openSetting({
    //             success(settingdata) {
    //               console.log(settingdata)
    //               if (settingdata.authSetting['scope.writePhotosAlbum']) {
    //                 console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
    //               } else {
    //                 console.log('获取权限失败，给出不给权限就无法正常使用的提示')
    //               }
    //             }
    //           })
    //         }
    //       },
    //       complete(res){
    //         console.log(res);
    //       }
    //     })
    //   }
    // })

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