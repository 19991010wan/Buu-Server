const app = getApp();
// let _title=''//页面标题
let content=""//评论框的内容
let ID=''

Page({
  data: {
    img:[],
    
    detail:"",
    comments:[],
    length:0
    
  },
  
  getcomments:function(e){
    this.setData({
      content:e.detail.value
    })
    console.log("评论内容",content)
  },

  //发送评论评论 事件处理
  send: function () {
    const {content}=this.data

    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y =date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
    console.log("当前时间：" + Y + '年'  + M+ '月' + D+ '日' ); 
    if(!content.trim()){
      wx.showToast({
        title: '输入不合法',
        icon:'none',
        mask:true
      })
    }
    else{
      wx.cloud.callFunction({
        name: 'msgcheck',
        data: {
          text: content
        }
      }).then((res) => {
        if (res.result.code == "200") {
          //检测通过
          console.log("检测通过")
          let commentsItem={}
          commentsItem.content=content
          commentsItem.time=Y+'-'+M+'-'+D
          let commentsArr=this.data.comments
          commentsArr.push(commentsItem)
          console.log("添加后的评论数组",commentsArr)
          wx.cloud.callFunction({
            name:"detail",
            data:{
              action:"send_schooltopic",
              id:ID,
              comments:commentsArr
            }
          }).then(res=>{
            console.log("发表成功",res)
            this.setData({
              comments:commentsArr,
              content:''
            })
          }).catch(res=>{
            console.log("发表失败",res)
          })
        } else {
          console.log("检测不通过")
          //执行不通过
          wx.showToast({
            title: '包含敏感字哦。',
            icon: 'none',
            duration: 3000
          })
          this.setData({
            content:""
          })
        }
      })
    }
  },

  onLoad: function (options) {
    ID=options.id
    console.log("详情接收的id",options);
    wx.setNavigationBarTitle({
      title:options.title
    })
    wx.cloud.database().collection("school_topic").doc(options.id).get().then(res=>{
      console.log("详情页成功",res)
      let img_=this.data.img
      img_=res.data.imurl_0
      if(res.data.imurl_0){
        this.setData({
          img:img_,
          length:img_.length
        })
      }
      this.setData({
        detail:res.data,
        comments:res.data.comments,
      })
      // console.log("评论",comments)
      
      // console.log("评论",detail.comments)
    }).catch(res=>{
      console.log("详情页失败",res)
    })
    
  },
  onReady: function (options) {
    // 页面渲染完成
    
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  //上拉加载
  onReachBottom: function () {
    
  },
  
 
})