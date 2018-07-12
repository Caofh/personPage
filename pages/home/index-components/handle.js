import moment from './../../../utils/of-vendor/moment'

function handle (data, obj) {
  var that = obj // 当前实例

  console.log(data)

  let data_new = data.original.data || []
  data_new.map((item) => {
    item.timestamp_str = moment(parseInt(item.timestamp)).format('YY-MM-DD HH:mm:ss')
  })


  console.log(data_new)









}

export default handle