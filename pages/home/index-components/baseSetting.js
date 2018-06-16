
function setting (obj) {
  /**
   * 获取系统信息并设置容器宽高
   */
  var that = obj

  wx.getSystemInfo({
    success: function (res) {
      that.setData({
        winWidth: res.windowWidth,
        winHeight: res.windowHeight
      });
      getApp().data.winHeight = res.windowHeight

    }
  });
}

export default setting