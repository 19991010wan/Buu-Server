// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"wanzhijie19991010-1ej2hmc1cd3bcc"
})

// 云函数入口函数
exports.main = async (event, context) => {
  if(event.action=="send_sociatyinfo"){
    return await cloud.database().collection("socity_infor").doc(event.id).update({
      data:{
        comments:event.comments
      }
    }).then(res=>{
      console.log("评论成功啦",res)
      return res
    }).catch(res=>{
      console.log("评论失败啦",res)
      return res
    })
  }else if(event.action=="send_schooltopic"){
    return await cloud.database().collection("school_topic").doc(event.id).update({
      data:{
        comments:event.comments
      }
    }).then(res=>{
      console.log("评论成功啦",res)
      return res
    }).catch(res=>{
      console.log("评论失败啦",res)
      return res
    })
  }else if(event.action=="send_inforshare"){
    return await cloud.database().collection("infor_share").doc(event.id).update({
      data:{
        comments:event.comments
      }
    }).then(res=>{
      console.log("评论成功啦",res)
      return res
    }).catch(res=>{
      console.log("评论失败啦",res)
      return res
    })
  }else if(event.action=="send_love"){
    return await cloud.database().collection("love_express").doc(event.id).update({
      data:{
        comments:event.comments
      }
    }).then(res=>{
      console.log("评论成功啦",res)
      return res
    }).catch(res=>{
      console.log("评论失败啦",res)
      return res
    })
  }else if(event.action=="send_schoolshare"){
    return await cloud.database().collection("school_share").doc(event.id).update({
      data:{
        comments:event.comments
      }
    }).then(res=>{
      console.log("评论成功啦",res)
      return res
    }).catch(res=>{
      console.log("评论失败啦",res)
      return res
    })
  }
}