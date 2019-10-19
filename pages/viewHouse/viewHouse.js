const app = getApp()
Page({
  data: {
    id:'',
    array: ['卡', '指纹'],
    objectArray: [
      {
        id: 0,
        name: '卡'
      },
      {
        id: 1,
        name: '指纹'
      }
    ],
    index: 0,
  },
  bindPickerChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  onLoad: function (options) {
    var that = this; 
    //console.log("接收到的参数是id=" + options.id);
    // 获取详情数据
    wx.request({
      url: "http://localhost:8080/lock/updateCheckInfo.action?method=updateCheck&id=" + options.id,
      success: function (res) { //请求成功
        //console.log("返回数据为：" + res.data.body.oper_name);
        that.setData({
          viewid: options.id,
          authorizer: res.data.body.authorizer,
          cust_tel: res.data.body.cust_tel,
          houseType: res.data.body.houseType,
          house_area: res.data.body.house_area,
          oper_date: res.data.body.oper_date,
          start_time: res.data.body.start_time,
          end_time: res.data.body.end_time
        }) 
      },
      fail: function (res) { // 请求失败
      }
    })
  
  },
  // 设置id
  idInput: function (e) {
    this.setData({
      id: e.detail.value
    })
  },
  // 设置id
  accreditInput: function (e) {
    this.setData({
      accredit: e.detail.value
    })
  },
  // 设置id
  cardInput: function (e) {
    this.setData({
      card: e.detail.value
    })
  },
  /***调用验证函数***/
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带的数据为：', e.detail.value)
    const params = e.detail.value

    //向后台发送时数据 wx.request...
    wx.request({
      url: 'http://localhost:8080/lock/getCheckInfo.action?method=getCheck',
      data: params,
      success: function (res) {
        console.log("返回数据为：" + res.data.msg);
        var msg = res.data.msg;
        if (msg == 1) {
          wx.showModal({
            title: '提示',
            content: '申请成功！',
            success: function (res) {
              wx.navigateTo({
                url: '/pages/index/index'
              })
            },
            fail: function (res) { },//接口调用失败的回调函数
            complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
          })
        } else if (msg == 0) {
          wx.showModal({
            title: '提示',
            content: '申请失败！',
          })
        }
      },
      fail: function (res) {

      }
    }),
      this.setData({
      accredit: '',
      card: ''
     })
  }
})