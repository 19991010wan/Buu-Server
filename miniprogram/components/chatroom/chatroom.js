const FATAL_REBUILD_TOLERANCE = 10
const SETDATA_SCROLL_TO_BOTTOM = {
  scrollTop: 100000,
  scrollWithAnimation: true,
}
const app = getApp();
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;
var recall_e=false

Component({
  properties: {
    envId: String,
    collection: String,
    groupId: String,
    groupName: String,
    userInfo: Object,
    onGetUserInfo: {
      type: Function,
    },
    getOpenID: {
      type: Function,
    },
  },

  data: {
    chats: [],
    textInputValue: '',
    openId: '',
    scrollTop: 0,
    scrollToMessage: '',
    hasKeyboard: false,
  },

  methods: {
    onGetUserInfo(e) {
      this.properties.onGetUserInfo(e)
    },

    getOpenID() { 
      return this.properties.getOpenID() 
    },

    mergeCommonCriteria(criteria) {
      return {
        groupId: this.data.groupId,
        ...criteria,
      }
    },

    async initRoom() {
      this.try(async () => {
        await this.initOpenID()

        const { envId, collection } = this.properties
        this.db = wx.cloud.database({
          env: envId,
        })
        const db = this.db
        const _ = db.command

        const { data: initList } = await db.collection(collection).where(this.mergeCommonCriteria()).orderBy('sendTimeTS', 'desc').get()

        console.log('init query chats', initList)

        this.setData({
          chats: initList.reverse(),
          scrollTop: 10000,
        })

        this.initWatch(initList.length ? {
          sendTimeTS: _.gt(initList[initList.length - 1].sendTimeTS),
        } : {})
      }, '初始化失败')
    },

    async initOpenID() {
      return this.try(async () => {
        const openId = await this.getOpenID()

        this.setData({
          openId,
        })
      }, '初始化 openId 失败')
    },

    async initWatch(criteria) {
      this.try(() => {
        const { collection } = this.properties
        const db = this.db
        const _ = db.command

        console.warn(`开始监听`, criteria)
        this.messageListener = db.collection(collection).where(this.mergeCommonCriteria(criteria)).watch({
          onChange: this.onRealtimeMessageSnapshot.bind(this),
          onError: e => {
            if (!this.inited || this.fatalRebuildCount >= FATAL_REBUILD_TOLERANCE) {
              this.showError(this.inited ? '监听错误，已断开' : '初始化监听失败', e, '重连', () => {
                this.initWatch(this.data.chats.length ? {
                  sendTimeTS: _.gt(this.data.chats[this.data.chats.length - 1].sendTimeTS),
                } : {})
              })
            } else {
              this.initWatch(this.data.chats.length ? {
                sendTimeTS: _.gt(this.data.chats[this.data.chats.length - 1].sendTimeTS),
              } : {})
            }
          },
        })
      }, '初始化监听失败')
    },

    onRealtimeMessageSnapshot(snapshot) {
      console.warn(`收到消息`, snapshot)

      if (snapshot.type === 'init') {
        this.setData({
          chats: [
            ...this.data.chats,
            ...[...snapshot.docs].sort((x, y) => x.sendTimeTS - y.sendTimeTS),
          ],
        })
        this.scrollToBottom()
        this.inited = true
      } else {
        let hasNewMessage = false
        let hasOthersMessage = false
        const chats = [...this.data.chats]
        for (const docChange of snapshot.docChanges) {
          switch (docChange.queueType) {
            case 'enqueue': {
              hasOthersMessage = docChange.doc._openid !== this.data.openId
              const ind = chats.findIndex(chat => chat._id === docChange.doc._id)
              if (ind > -1) {
                if (chats[ind].msgType === 'image' && chats[ind].tempFilePath) {
                  chats.splice(ind, 1, {
                    ...docChange.doc,
                    tempFilePath: chats[ind].tempFilePath,
                  })
                } else chats.splice(ind, 1, docChange.doc)
              } else {
                hasNewMessage = true
                chats.push(docChange.doc)
              }
              break
            }
          }
        }
        this.setData({
          chats: chats.sort((x, y) => x.sendTimeTS - y.sendTimeTS),
        })
        if (hasOthersMessage || hasNewMessage) {
          this.scrollToBottom()
        }
      }
    },

    time_down:function(){
      // let stime=Date.parse(time_cau)
      // var date = new Date(stime);
      // //获取年份  
      // var Y =date.getFullYear();
      // //获取月份  
      // var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      // //获取当日日期 
      // var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      // var hour = date.getHours()
      // var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      // var second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      // var time_en=Y+"-"+M+"-"+D+" "+hour+":"+minute+":"+second
      console.log("打印了打印了")
    },

    //消息撤回
    recall:function(e){
      var id =  e.currentTarget.dataset.item._id
      console.log("点击了点击了", id)
      console.log("用户的openid是", this.data.openId)

      const { collection } = this.properties
      const db = this.db
      const _ = db.command

      db.collection(collection).doc(id).get({
        success(res){
          console.log("查询成功",res.data)
          console.log("查询成功",res.data._openid)
          let textvalue=res.data.textContent
          let imgFileID=res.data.imgFileID
          let stime=Date.parse(res.data.sendTime)
          var date = new Date(stime);
          //获取年份  
          var Y =date.getFullYear();
          //获取月份  
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
          //获取当日日期 
          var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
          var hour = date.getHours()
          var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
          var second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
          var starttime=Y+"-"+M+"-"+D+" "+hour+":"+minute+":"+second
          console.log("发送的时间是",starttime)

          let etime=Date.parse(new Date())
          var date = new Date(etime);
          //获取年份
          var Y =date.getFullYear();
          //获取月份  
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
          //获取当日日期 
          var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
          var hour = date.getHours()
          var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
          var second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
          var endtime=Y+"-"+M+"-"+D+" "+hour+":"+minute+":"+second
          console.log("撤回的时间是",endtime)

          //计算时间差
          var s_time = Date.parse(new Date(starttime));
          var e_time = Date.parse(new Date(endtime));
          var usedTime = e_time - s_time; //两个时间戳相差的毫秒数
          var days = Math.floor(usedTime / (24 * 3600 * 1000));
            //计算出小时数
          var leave1 = usedTime % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
          var hours = Math.floor(leave1 / (3600 * 1000));
          //计算相差分钟数
          var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
          var minutes = Math.floor(leave2 / (60 * 1000));
          var dayStr = days == 0 ? "" : days;
          var hoursStr = hours == 0 ? "" : hours;
          var _time = dayStr + "天" + hoursStr + "小时" + minutes + "分钟";
          console.log("相差的时间是",_time);                    

          
          if(app.globalData.openid===res.data._openid){
            console.log("是本人")
            if(res.data.msgType==="image"){
              wx.showActionSheet({
                itemList: ['撤回','保存'],
                itemColor: '#007aff',
                success(res){
                  console.log(res.tapIndex);
                  if (res.tapIndex === 0){
                    
                    //不能撤回
                    if(dayStr>0||hoursStr>0||minutes>2){
                      wx.showToast({
                        title: '已经无法撤回',
                        icon: 'none',
                        duration: 1500,
                      })
                    }
                    //可以撤回
                    else if(minutes<=2){
                      console.log("可以撤回了")
                      db.collection(collection).doc(id).remove({
                        success: res => {
                          wx.showToast({
                            title: '撤回成功',
                          })
                          this.setData({
                            
                          })
                        },
                        fail: err => {
                          wx.showToast({
                            icon: 'none',
                            title: '撤回失败',
                          })
                        }
                      })  
                    }
                  }
                  else if (res.tapIndex === 1){
                    //获取图片信息
                    wx.getImageInfo({
                      src: imgFileID,
                      success: function (res) {
                        var path = res.path;
                        //保存图片到本地
                        wx.saveImageToPhotosAlbum({
                          filePath: path,
                          success: function () {
                            wx.showToast({
                              title: '保存成功'
                            })
                          },
                          fail: function (res) {
                            wx.showToast({
                              title: '保存失败',
                              icon: 'none'
                            })
                          }
                        })
                      }
                    })
                  }
                }
              })
            }
            else if(res.data.msgType==="text"){
              wx.showActionSheet({
                itemList: ['撤回','复制'],
                itemColor: '#007aff',
                success(res){
                  console.log(res.tapIndex);
                  console.log(textvalue);
                  if (res.tapIndex === 0){
  
                    //不能撤回
                    if(dayStr>0||hoursStr>0||minutes>2){
                      wx.showToast({
                        title: '已经无法撤回',
                        icon: 'none',
                        duration: 1500,
                      })
                    }
                    //可以撤回
                    else if(minutes<=2){
                      console.log("可以撤回了")
                      db.collection(collection).doc(id).remove({
                        success: res => {
                          wx.showToast({
                            title: '撤回成功',
                          })
                          this.setData({
                            
                          })
                        },
                        fail: err => {
                          wx.showToast({
                            icon: 'none',
                            title: '撤回失败',
                          })
                        }
                      })  
                    }
  
  
                    wx.setStorage({
                      data: textvalue,
                      key: 'recall',
                    })
                  }else if (res.tapIndex === 1){
                    wx.setClipboardData({
                      data: textvalue,
                      success: function (res) {
                        wx.getClipboardData({
                          success: function (res) {
                            wx.showToast({
                              title: '复制成功'
                            })
                          }
                        })
                      }
                    })
                  }
                }
              })
            }
          }
          else{
            console.log("不是本人")
            if(res.data.msgType==="image"){
              wx.showActionSheet({
                itemList: ['保存'],
                itemColor: '#007aff',
                success(res){
                  console.log(res.tapIndex);
                  if (res.tapIndex === 0){
                    //获取图片信息
                    wx.getImageInfo({
                      src: imgFileID,
                      success: function (res) {
                        var path = res.path;
                        //保存图片到本地
                        wx.saveImageToPhotosAlbum({
                          filePath: path,
                          success: function () {
                            wx.showToast({
                              title: '保存成功'
                            })
                          },
                          fail: function (res) {
                            wx.showToast({
                              title: '保存失败',
                              icon: 'none'
                            })
                          }
                        })
                      }
                    })
                  }
                }
              })
            }
            else if(res.data.msgType==="text"){
              wx.showActionSheet({
                itemList: ['复制'],
                itemColor: '#007aff',
                success(res){
                  console.log(res.tapIndex);
                  if (res.tapIndex === 0){
                    wx.setClipboardData({
                      data: textvalue,
                      success: function (res) {
                        wx.getClipboardData({
                          success: function (res) {
                            wx.showToast({
                              title: '复制成功'
                            })
                          }
                        })
                      }
                    })
                  }
                }
              })
            }
          }
        },
        fail(res) {
          console.log("查询失败", res)
        }
      })
      // console.log("有没有没有")
      // console.log("是否可以撤回",recall_e)
      // if(recall_e===true){
      //   db.collection(collection).doc(id).remove({
      //     success: res => {
      //       wx.showToast({
      //         title: '撤回成功',
      //       })
      //       this.setData({

      //       })
      //     },
      //     fail: err => {
      //       wx.showToast({
      //         icon: 'none',
      //         title: '撤回失败',
      //       })
      //       console.error('[数据库] [删除记录] 失败：', err)
      //     }
      //   })
      // }
    },

    async onConfirmSendText(e) {
      this.try(async () => {
        if (!e.detail.value) {
          return
        }

        const { collection } = this.properties
        const db = this.db
        const _ = db.command

        const doc = {
          _id: `${Math.random()}_${Date.now()}`,
          groupId: this.data.groupId,
          avatar: this.data.userInfo.avatarUrl,
          nickName: this.data.userInfo.nickName,
          msgType: 'text',
          textContent: e.detail.value,
          sendTime: new Date(),
          sendTimeTS: Date.now(), // fallback
        }

        //设置缓存


        this.setData({
          textInputValue: '',
          chats: [
            ...this.data.chats,
            {
              ...doc,
              _openid: this.data.openId,
              writeStatus: 'pending',
            },
          ],
        })
        this.scrollToBottom(true)
        this.scrollToBottom(false)

        await db.collection(collection).add({
          data: doc,
        })

        this.setData({
          chats: this.data.chats.map(chat => {
            if (chat._id === doc._id) {
              return {
                ...chat,
                writeStatus: 'written',
              }
            } else return chat
          }),
        })
      }, '发送文字失败')
    },

    async onChooseImage(e) {
      wx.chooseImage({
        count: 1,
        sourceType: ['album', 'camera'],
        success: async res => {
          const { envId, collection } = this.properties
          const doc = {
            _id: `${Math.random()}_${Date.now()}`,
            groupId: this.data.groupId,
            avatar: this.data.userInfo.avatarUrl,
            nickName: this.data.userInfo.nickName,
            msgType: 'image',
            sendTime: new Date(),
            sendTimeTS: Date.now(), // fallback
          }

          this.setData({
            chats: [
              ...this.data.chats,
              {
                ...doc,
                _openid: this.data.openId,
                tempFilePath: res.tempFilePaths[0],
                writeStatus: 0,
              },
            ]
          })
          this.scrollToBottom(true)

          const uploadTask = wx.cloud.uploadFile({
            cloudPath: `${this.data.openId}/${Math.random()}_${Date.now()}.${res.tempFilePaths[0].match(/\.(\w+)$/)[1]}`,
            filePath: res.tempFilePaths[0],
            config: {
              env: envId,
            },
            success: res => {
              this.try(async () => {
                await this.db.collection(collection).add({
                  data: {
                    ...doc,
                    imgFileID: res.fileID,
                  },
                })
              }, '发送图片失败')
            },
            fail: e => {
              this.showError('发送图片失败', e)
            },
          })

          uploadTask.onProgressUpdate(({ progress }) => {
            this.setData({
              chats: this.data.chats.map(chat => {
                if (chat._id === doc._id) {
                  return {
                    ...chat,
                    writeStatus: progress,
                  }
                } else return chat
              })
            })
          })
        },
      })
    },

     /**
     * 获取聚焦
     */
    focus: function(e) {
      this.scrollToBottom(true)
      this.scrollToBottom(false)
      // keyHeight = e.detail.height;
      // console.log("keyHeight高度为",keyHeight)
      // this.setData({
      //   scrollHeight: (windowHeight - keyHeight) + 'px'
      // });
      // this.setData({
      //   scrollToMessage: 'msg-' + (this.data.chats.length - 1),
      //   inputBottom: keyHeight + 'px'
      // })
      // console.log(this.data.scrollToMessage,this.data.inputBottom)
      //计算msg高度
      // calScrollHeight(this, keyHeight);

  },

  //失去聚焦(软键盘消失)
  blur: function(e) {
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0
    })
    this.setData({
      scrollToMessage: 'msg-' + (this.data.chats.length - 1)
    })

  },

    onMessageImageTap(e) {
      wx.previewImage({
        urls: [e.target.dataset.fileid],
      })
    },

    scrollToBottom(force) {
      if (force) {
        console.log('force scroll to bottom')
        this.setData(SETDATA_SCROLL_TO_BOTTOM)
        return
      }

      this.createSelectorQuery().select('.body').boundingClientRect(bodyRect => {
        this.createSelectorQuery().select(`.body`).scrollOffset(scroll => {
          if (scroll.scrollTop + bodyRect.height * 3 > scroll.scrollHeight) {
            console.log('should scroll to bottom')
            this.setData(SETDATA_SCROLL_TO_BOTTOM)
          }
        }).exec()
      }).exec()
    },

    async onScrollToUpper() {
      if (this.db && this.data.chats.length) {
        const { collection } = this.properties
        const _ = this.db.command
        const { data } = await this.db.collection(collection).where(this.mergeCommonCriteria({
          sendTimeTS: _.lt(this.data.chats[0].sendTimeTS),
        })).orderBy('sendTimeTS', 'desc').get()
        this.data.chats.unshift(...data.reverse())
        this.setData({
          chats: this.data.chats,
          scrollToMessage: `item-${data.length}`,
          scrollWithAnimation: false,
        })
      }
    },

    async try(fn, title) {
      try {
        await fn()
      } catch (e) {
        this.showError(title, e)
      }
    },

    showError(title, content, confirmText, confirmCallback) {
      console.error(title, content)
      wx.showModal({
        title,
        content: content.toString(),
        showCancel: confirmText ? true : false,
        confirmText,
        success: res => {
          res.confirm && confirmCallback()
        },
      })
    },
  },

  ready() {
    global.chatroom = this
    this.initRoom()
    this.fatalRebuildCount = 0
  },
})
