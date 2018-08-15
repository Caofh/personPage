// app.js

import { request, setLoginUrl, extend, constants, login } from './sdk/index'
import { config } from './config'

var fundebug = require('./utils/fundebug.0.0.3.min.js')
fundebug.apikey = 'b79963b3269ca84253d58aab2c484bdc32affedb342d9026c3761e2dd1bfaff7'
fundebug.appVersion = constants.DIV
fundebug.releaseStage = 'production'

let metaData = {}

try {
	metaData = wx.getSystemInfoSync()
} catch (e) {
	//
}

fundebug.metaData = metaData

const launchAppFailTips = '请下载“OFashion迷橙”APP'

App({
  data: {
    api_url: config.apiUrl,
    upload_url: config.uploadUrl,
    winHeight: 0,
    supportLaunchApp: false, // 是否支持打开APP
    launchAppFailTips: launchAppFailTips,




  },

  onLaunch() {

    // 配置登录url(关联login.js中的login方法，不配置，校验登录时会报错)
    // setLoginUrl(config.loginUrl)

    // // 动态修改小程序的标题
    // this.setTitle(constants.MAINTITLE)

  },

  request(options, success, fail, complete) {
	  request(extend(true, {
		  method: 'GET',
		  data: {},		  
		  // 请求之前是否需要授权登陆，如果该项指定为 true，会在请求之前进行授权登录
		  login: true,
		
		  success(res) {
			  if (res.data && res.data.original && res.data.original.status == 'fail') {
				  return fail && fail(res.data.original.msg)
			  }
			
			  success && success(res.data)
		  },
		
		  fail(error) {
			  // request:fail 可能是网络原因
			  fail && fail(error.type ? (error.type + error.message) : (error.errMsg ? error.errMsg : error))
		  },
		
		  complete() {
			  complete && complete()
		  }
	  }, options))
  },

  // 二次封装request方法.
  ajax(option) {
    let url = option.url || ''
    let data = option.para || ''
    let method = option.type || ''
    let login = option.login || '' // 请求之前是否需要授权登陆，如果该项指定为 true，会在请求之前进行授权登录
    let success = option.success || ''
    let fail = option.fail || ''
    let complete = option.complete || ''

    let option_new = {
      url: url,
      data: data,
      method: method,
      login: login
    }

    this.request(option_new, success, fail, complete)
  },

  // 动态修改小程序的标题
  setTitle (titleName) {
    wx.setNavigationBarTitle({
      title: titleName
    })

    // 动态改变导航的字体颜色和背景颜色.
    // wx.setNavigationBarColor({
    //   frontColor: '#ffffff',
    //   backgroundColor: '#0dff48',
    // })

  },



  // 微信登录方法
  login (callback) {
    wx.login({
      success: function(res) {
        // console.log(res)

        if (res.code) {
          //发起网络请求
          const url = config.apiUrl + '/account/personLogin/wx_login'
          getApp().ajax({
            url: url || '',
            type: 'POST',
            login: false,
            para: {
              code: res.code || ''
            },
            success (data) {
              // console.log(data)
              // return false

              callback && callback(data)

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

        } else {
          console.log('登录失败！' + res.errMsg)

        }
      }
    });

  }

})