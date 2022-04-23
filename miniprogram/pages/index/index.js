//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
      videoUrl:"cloud://wanzhijie19991010-1ej2hmc1cd3bcc.7761-wanzhijie19991010-1ej2hmc1cd3bcc-1304947098/34a7c94c857b728a4223e88496df8c12.mp4",
      background: ['green', 'red', 'yellow'],
      indicatorDots: true,
      vertical: false,
      autoplay: true,
      interval: 3000,
      duration: 1200,
      swipers:[{
          image:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1143624947,420716175&fm=26&gp=0.jpg"
      },{
          image:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fupfile.cuepa.cn%2Fnewspic%2F488997%2Fs_b0393992375b0eb39bb1e5f99de0a756316987.jpg&refer=http%3A%2F%2Fupfile.cuepa.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615042518&t=b8aea5a57c1240644d93720c5ece9b8c"
      },{
          image:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=799696570,3903530323&fm=26&gp=0.jpg"
      },{
          image:"https://zsxx.buu.edu.cn/upload/201612/19/201612191007387978.jpg"
      },{
          image:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fww3.sinaimg.cn%2Flarge%2Fbb884b37jw1fbdabsxpj8j20oz0gmacv.jpg&refer=http%3A%2F%2Fwww.sina.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615042711&t=e8cf9b7e5b379d765512eeef7281eb31"
      }
      ],
      logos:[{
          url:"../sociaty-infor/sociaty-infor",
          image:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhdn.xnimg.cn%2Fphotos%2Fhdn221%2F20120704%2F1810%2Fh_main_xjUe_3386000005d31376.jpg&refer=http%3A%2F%2Fhdn.xnimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615043275&t=feac64192c46ca800a80bb851cafd16f",
          title:"社团消息"
      },{
          url:"../schooltopic/schooltopic",
          image:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.51miz.com%2FElement%2F00%2F37%2F57%2F49%2F4bfe8197_E375749_f2a4ff7d.png%21%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue%2Fformat%2Fpng&refer=http%3A%2F%2Fimg.51miz.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615043620&t=6ea7b8c6b414703dfde79a1e46ab6baa",
          title:"校园论坛"
      },{
          url:"../inforcommon/inforcommon",
          image:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3652029870,419609160&fm=26&gp=0.jpg",
          title:"信息共享"
      },{
        url:"../loveexpress/loveexpress",  
        image:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1168491471,2510709348&fm=26&gp=0.jpg",
          title:"表白墙"
      },{
          url:"../schoolmates/schoolmates",  
          image:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1701863817,3088837888&fm=26&gp=0.jpg",
          title:"校友会"
      }
      ],


    // clientHeight:'',
    isHide:false,
    logged:false,
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  // 页面渲染后执行
  onLoad: function () {
    wx.getStorage({
      key: 'iflogged',
      success: (res) => {
        console.log("是否登录",res.data)
        this.setData({
          logged:res.data
        })
        if(this.data.logged==true){
          wx.login({
            success:res =>{
              // 调用云函数
              wx.cloud.callFunction({
                name: 'login',
                data: {},
                success: res => {
                  console.log('[云函数] [login] user openid: ', res.result.openid)
                  app.globalData.openid = res.result.openid
                  console.log('[云函数] [login] user openid: ', app.globalData.openid)
                },
                fail: err => {
                  console.error('[云函数] [login] 调用失败', err)
                }
              })
            }
          })
        }else{
          wx.showToast({
            title: '请授权登录！',
            icon: 'none',
            duration: 1500,
            success: function () {
              //定时器，未授权1.5秒后跳转授权页面
              setTimeout(function () {
                wx.reLaunch({
                  url: '../login/login',
                })
              }, 1500);
            }
          })
        }
      },
      fail: (res) => {
        wx.showToast({
          title: '请授权登录！',
          icon: 'none',
          duration: 1500,
          success: function () {
            //定时器，未授权1.5秒后跳转授权页面
            setTimeout(function () {
              wx.reLaunch({
                url: '../login/login',
              })
            }, 1500);
          }
        })
      },
      complete: (res) => {},
    })
  },
  
  /**
* 用户点击右上角分享
*/
  onShareAppMessage() {
    return {
      title: '首页'//分享内容
      // path: '/pages/my/my'//分享地址
    }
  }
})
