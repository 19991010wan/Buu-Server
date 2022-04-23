// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"wanzhijie19991010-1ej2hmc1cd3bcc"
})

// 云函数入口函数
exports.main = async (event, context) => {
  if(event.action=="add_inforcommon"){
    return await cloud.database().collection("infor_share").doc(event.id).update({
      data:{
        list:event.list
      }
    }).then(res=>{
      console.log("添加成功啦",res)
      return res
    }).catch(res=>{
      console.log("添加成功啦",res)
      return res
    })
  }
}