
'use strict'

import { config } from './config'

const HOST_URL = config.apiUrl
// const UPLOAD_URL = config.uploadUrl

let requestApi = {
  // getConfigData: HOST_URL + '/get_config_data', // 获取接口下发的配置信息
  // wechat_home: HOST_URL + '/wechat_home',       // 获取首页数据

  homeList: HOST_URL + '/api/person_page', // 获取数据列表接口
  userList: HOST_URL + '/api/person_page/user_list', // 获取用户列表接口
  login: HOST_URL + '/account/personLogin' // 登录接口

}

export { requestApi }