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
    userinfoDialog: false // 微信获取用户信息弹窗显示标识
  },

  /**
   * 页面初始化
   */
  onLoad: function (options) {
    let that = this

    // 获取用户信息(只有localstorage里不存在userinfo信息时才执行)
    if ( !(wx.getStorageSync('userinfo') && wx.getStorageSync('userinfo').nickName)) {
      this.getUserInfo()
    }

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

  userinfoCancel () {
    this.setData({
      userinfoDialog: false
    })
  },
  userinfoConfirm () {
    this.setData({
      userinfoDialog: false
    })
  },
  bindGetUserInfo (e) {
    // console.log(e.detail.userInfo)
    this.stoBaseInfo(e.detail.userInfo)

  },


  // 获取用户信息接口
  getUserInfo () {
    const that = this

    wx.checkSession({
      success: function(){
        //session_key 未过期，并且在本生命周期一直有效

        // 查看是否授权,可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.userInfo" 这个 scope
        wx.getSetting({
          success: function(res){
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称
              wx.getUserInfo({
                success: function(res) {
                  // console.log(res.userInfo)

                  that.stoBaseInfo(res.userInfo)
                }
              })

            } else {
              that.setData({
                userinfoDialog: true // 显示获取用户信息弹窗
              })

            }

          }
        })

      },
      fail: function(){
        // session_key 已经失效，需要重新执行登录流程
        getApp().login()

      }
    })
  },
  // 拼合用户信息和openid等信息，存入storage
  stoBaseInfo (userInfo) {
    // console.log(userInfo)
    let baseInfo = userInfo || {}

    getApp().login((data) => {
      // console.log(data)

      baseInfo.openid = data.original.openid || ''
      baseInfo.session_key = data.original.session_key || ''

      // console.log(baseInfo)
      wx.setStorageSync('userinfo', baseInfo)

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
