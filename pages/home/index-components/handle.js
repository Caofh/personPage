import moment from './../../../utils/of-vendor/moment'

function handle (data, obj) {
  var that = obj // 当前实例

  // console.log(data)

  let data_new = data.original.data || []

  // 处理数据
  data_new.map((item) => {
    item.timestamp_str = moment(parseInt(item.timestamp)).format('YY-MM-DD HH:mm:ss')
  })

  // 按照时间戳排序
  data_new.sort((a, b) => {
    return a.timestamp < b.timestamp
  })

  // console.log(data_new)

}

export default handle