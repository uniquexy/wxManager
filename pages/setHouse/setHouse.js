// pages/setHouse/setHouse.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onLoad: function (options) {
    var that = this;
    //console.log("接收到的参数是id=" + options.id);
    // 获取详情数据
    that.setData({
      setid: options.id,
    })

  },
  /***设置指令***/
  setcommend: function (e) {
    var data = e.currentTarget.dataset;
    //console.log(data)
    wx.navigateTo({
      url: '../setCommend/setCommend?imei=' + data.id,
    })
  },
  allowPass: function (e) {
    var data = e.currentTarget.dataset;
    //console.log(data)
    wx.request({
      url: "http://localhost:8080/lock/SetupInstructionsByImei.action?method=setupInstructionsByImei&imei_no="+data.id+"&id="+data.s,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) { //请求成功
        //console.log(res.data);//在调试器里打印网络请求到的json数据
        var title = '';
        var icon = '';
        if (res.data.msg==0){
          title = "成功";
          icon = "success";
        } else if (res.data.msg == 1){
          title = "失败";
          icon = "fail";
        } else if (res.data.msg == 2) {
          title = "已有改设置";
          icon = "fail";
        }
        wx.showToast({
          title: title,
          icon: icon,
          duration: 2000
        })
      },
      fail: function (res) { // 请求失败
        wx.showToast({
          title: '失败',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
})