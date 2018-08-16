//index.js
const app = getApp()
import { requestApi } from '../../api'
import { constants } from '../../sdk/constants'

// 请求首页数据
import getData from './index-components/getData'
import baseSetting from './index-components/baseSetting'

Page({
  data: {
    winWidth: 0, // 最外层容器宽度
    winHeight: 0, // 最外层容器高度
    brandImgHeight: 0, // 底部品牌图片的高度（解决图片自适应高度问题）
    resourceHeight: 0, // 资源图片的高度（解决图片自适应高度问题）
    scrollTop: 0, // 滚动容器的距上距离

    data: {}, // 首页请求数据

  },

  /**
   * 页面初始化
   */
  onLoad: function (options) {
    let that = this

    // 获取系统信息并设置容器宽高
    baseSetting(that)

    // 请求首页数据
    let url = requestApi.userList // 首页接口地址
    getData(url, that, function (data) {
      // console.log(data)
      // return false

      const realData = data.original.data || []

      // 取首页数据
      that.setData({
        data: realData
      })

    })

  },

  scrolltolower () {},
  listenScroll () {},
  onShareAppMessage: function (res) {
    var that = this

    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target)
    }
    return {
      // 设置分享的title.
      title: that.data.shareTitle,
      path: '/pages/index/index',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  }

})
