//index.js
//获取应用实例
const app = getApp()
Page({
  data: {

  },
  onLoad: function () {
    var that = this
    wx.request({
      url: "http://localhost:8080/lock/getDeviListInfo.action?method=getDeviList",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) { //请求成功
        //console.log(res.data);//在调试器里打印网络请求到的json数据   
        that.setData({
          list_data: res.data.body
        })            
      },
      fail: function (res) { // 请求失败
      }
    })
  },
  add: function () {
    wx.navigateTo({
      url: '../addHouse/addHouse'
    })
  },
  viewByid(event){
    if(event.currentTarget.dataset.s){
      console.log(event.currentTarget.dataset.s);
      wx.navigateTo({
        url: '../viewHouse/viewHouse?id=' + event.currentTarget.dataset.s, 
      })
    }
  },
  setByid(event) {
    if (event.currentTarget.dataset.s) {
      console.log(event.currentTarget.dataset.s);
      wx.navigateTo({
        url: '../setHouse/setHouse?id=' + event.currentTarget.dataset.s,
      })
    }
  }
})
