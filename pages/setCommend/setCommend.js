const app = getApp()
Page({
  data: {
  },
  bindPickerChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  onLoad: function (options) {
    var that = this;
    console.log("接收到的参数是id=" + options.imei);
    // 获取详情数据
    wx.request({
      url: "http://localhost:8080/lock/GetParaListByImei.action?method=getParaListByImei&imei_no=" + options.imei,
      success: function (res) { //请求成功
        console.log("返回数据为：" + res.data.body);
        that.setData({
          list_data: res.data.body
        })     
      },
      fail: function (res) { // 请求失败
      }
    })

  },
  // 设置房间编码
  houseNameInput: function (e) {
    this.setData({
      houseName: e.detail.value
    })
  },
  // 设置名称
  setNameInput: function (e) {
    this.setData({
      setName: e.detail.value
    })
  },
  // 设置指令
  contentInput: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  /***调用验证函数***/
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带的数据为：', e.detail.value)
    const params = e.detail.value

    //向后台发送时数据 wx.request...
    wx.request({
      url: 'http://localhost:8080/lock/AddPara.action?method=addPara',
      data: params,
      success: function (res) {
        console.log("返回数据为：" + res.data.msg);
        var msg = res.data.msg;
        if (msg == 1) {
          wx.showModal({
            title: '提示',
            content: '设置成功！',
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
            content: '设置失败！',
          })
        }
      },
      fail: function (res) {

      }
    })
  }
})