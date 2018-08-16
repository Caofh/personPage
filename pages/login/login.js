//index.js
const app = getApp()
import { requestApi } from '../../api'
import { constants } from '../../sdk/constants'

// 请求首页数据
// import getData from './index-components/getData'
import baseSetting from './index-components/baseSetting'

Page({
  data: {
    winWidth: 0, // 最外层容器宽度
    winHeight: 0, // 最外层容器高度
    brandImgHeight: 0, // 底部品牌图片的高度（解决图片自适应高度问题）
    resourceHeight: 0, // 资源图片的高度（解决图片自适应高度问题）
    scrollTop: 0, // 滚动容器的距上距离

    show: false, // 登录页面是否显示
    account: '', // 用户名
    password: '', // 密码
  },

  /**
   * 页面初始化
   */
  onLoad: function (options) {
    let that = this

    // 获取系统信息并设置容器宽高
    baseSetting(that)

  },
  onShow () {

    this.setData({
      account: '',
      password: ''
    })


    const userId = wx.getStorageSync('user_id')
    if (userId) {
      // 跳转到数据详情页
      wx.navigateTo({
        url:"/pages/home/index"
      })
    } else {
      this.setData({
        show: true
      })
    }

  },
  onUnload: function () { //如果页面被卸载时被执行
    wx.switchTab({
      url: '/pages/list/list',
    })
  },
  back () {
    wx.switchTab({
      url: '/pages/list/list'
    })

  },
  bindAccountInput (e) {
    const value = e.detail.value
    this.setData({
      account: value
    })

  },
  bindPasswordInput (e) {
    const value = e.detail.value
    this.setData({
      password: value
    })

  },
  login () {
    const account = this.data.account
    const password = this.data.password

    const emailMark = /@.*.com/.test(account) // 正则验证是否为邮箱

    const type = emailMark ? 2 : 1 // 如果是邮箱传2，电话传1
    const data = {
      phone: account,
      password: password,
      type: type
    }

    console.log(data)
    console.log(requestApi.login)

    getApp().ajax({
      url: requestApi.login || '',
      type: 'POST',
      login: false,
      para: data,
      success (data) {

        const userId = data.original.data[0].id || ''
        wx.setStorageSync('user_id', userId)

        // 跳转到数据详情页
        wx.navigateTo({
          url:"/pages/home/index"
        })

      },
      fail (error) {
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: error,
          success: function (confirm, cancel) {
            if (confirm) {

              // 判断如果是用户未授权的情况.
              if (error.indexOf('ERR_WX_GET_USER_INFO') >= 0) {

                // 跳转到重新授权页面
                wx.navigateTo({
                  url: '/pages/account/authorize/authorize',
                })

              }
            }
          }
        })

      },
      complete () {

      }

    })

  },
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
