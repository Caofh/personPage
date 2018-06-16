
'use strict'

import { config } from './config'

const HOST_URL = config.apiUrl
const UPLOAD_URL = config.uploadUrl

let requestApi = {
  getConfigData: HOST_URL + '/get_config_data', // 获取接口下发的配置信息

  wechat_home: HOST_URL + '/wechat_home',       // 获取首页数据

}

export { requestApi }