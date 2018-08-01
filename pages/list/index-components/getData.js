import {constants} from '../../../sdk/constants'
import handle from './handle'

function getData (url, obj, callback, complete) {

  const userId = wx.getStorageSync('user_id')

  getApp().ajax({
    url: url || '',
    type: 'GET',
    login: false,
    para: {
      user_id: userId
    },
    success (data) {
      // console.log(data)
      // return false

      // 返回数据预处理
      handle(data, obj)

      callback && callback (data)
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
      complete && complete()
    }

  })





}

export default getData