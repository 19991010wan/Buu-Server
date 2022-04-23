// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  if(event.action=="delete_mytopic"){
    try {
      return await db.collection('school_topic').where({
        _id: _.in(event.idS)
      }).remove()
      } catch (e) {
        console.error(e)
      }
  }

}