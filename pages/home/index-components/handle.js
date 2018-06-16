import fun_loop from '../../../utils/of-vendor/fun_loop'
import { formatImage } from '../../../utils/of-vendor/formatImage'
import imgZoom from '../../../utils/of-vendor/imgZoomAuto'

function handle (data, obj) {
  var that = obj // 当前实例

  // // 将轮播图中的图片加上http地址
  // fun_loop(data.original.data.banner_list)(function (index, value) {
  //   value.banner_image.path = formatImage.cdnImage(value.banner_image.path, formatImage.THUMBNAIL_M)
  // })
  //
  // // 下沉资源中的图片加上http地址
  // fun_loop(data.original.data.resource_list)(function (index, value) {
  //   value.cover_image.path = formatImage.cdnImage(value.cover_image.path, formatImage.THUMBNAIL_M)
  // })
  //
  // // 底部中的图片加上http地址
  // if (data.original.data.brand_bottom_img_info && data.original.data.brand_bottom_img_info.img_url) {
  //   data.original.data.brand_bottom_img_info.img_url =
  //     formatImage.cdnImage(data.original.data.brand_bottom_img_info.img_url, formatImage.THUMBNAIL_M)
  // }
  //
  // // 等比例缩放图片，取新高度.
  // var obj = imgZoom({
  //   oldWidth: 750,
  //   oldHeight: 500,
  //   newWidth: that.data.winWidth
  // })
  //
  // var obj_footer = imgZoom({
  //   oldWidth: 640,
  //   oldHeight: 584,
  //   newWidth: that.data.winWidth
  // })
  //
  // // 等比例缩放图片后，设置图片的高度.
  // that.setData({
  //     resourceHeight: obj.newHeight,
  //     brandImgHeight: obj_footer.newHeight
  // })

}

export default handle