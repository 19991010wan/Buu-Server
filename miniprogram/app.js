//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
        env:"wanzhijie19991010-1ej2hmc1cd3bcc"
      })
    }

    this.globalData = {
      userInfo: '',
      openid:'',
      login_index:0,
      index_:0,//校园论坛下拉框下标
      ifrefresh_info:true,//信息共享判断是否刷新页面
      ifrefresh_love:true,//表白墙判断是否刷新页面
      ifrefresh_sociaty:true,//社团消息判断是否刷新页面
      ifrefresh_schooltopic:true,//校园论坛判断是否刷新页面
      ifrefresh_schoolshare:true,//校友会判断是否刷新页面
      ifmyinforrefresh:true,//我的共享是否刷新页面
      ifmyloverefresh:true,//我的表白墙是否刷新页面
      ifmytopicrefresh:true,//我的论坛是否刷新页面
    }
  }
})
