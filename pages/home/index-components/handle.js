import fun_loop from '../../../utils/of-vendor/fun_loop'
import { formatImage } from '../../../utils/of-vendor/formatImage'
import imgZoom from '../../../utils/of-vendor/imgZoomAuto'

function handle (data, obj) {
  var that = obj // 当前实例

  console.log(data)

  const realData = data.original.data

  let timeArr = []
  realData.map((item) => {
    const currentTimeStamp = item.timestamp || ''
    if (timeArr.indexOf(currentTimeStamp) < 0) {
      timeArr.push(currentTimeStamp)
    }
  })

  // console.log(timeArr)

  let dataArr = []
  timeArr.map((item) => {
    const timestamp = item

    let currentObj = {}
    realData.map((itemSon) => {
      if (itemSon.timestamp == timestamp) {
        currentObj.id = itemSon.id || ''
        currentObj.id = itemSon.id || ''
        currentObj.id = itemSon.id || ''
        currentObj.id = itemSon.id || ''





        // currentArr.push(itemSon)
      }
    })

    dataArr.push(currentArr)
  })

  console.log(dataArr)











}

export default handle