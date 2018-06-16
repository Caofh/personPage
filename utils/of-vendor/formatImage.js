const IMG_URL_1 = 'https://img.ofashion.com.cn'
const IMG_URL_2 = 'https://img4.ofashion.com.cn'
const IMG_URL_3 = 'https://img5.ofashion.com.cn'

const THUMBNAIL_XS = '?x-oss-process=image/resize,w_200'
const THUMBNAIL_S = '?x-oss-process=image/resize,w_320'
const THUMBNAIL_M = '?x-oss-process=image/resize,w_640'
const THUMBNAIL_L = '?x-oss-process=image/resize,w_750'

/** 获取图片的完整路径
* @params string imgPath 绝对相对路径
* @params string size 可缩率图大小，默认原图
* @return string 完整的缩率图路径
*/

function cdnImage(imgPath, size = '') {
  let path = imgPath.replace(/^http(s)?:\/\/.*?\//, '/')
  let index = hashChange(path).charCodeAt(0) % 3
  let domain = '';

  switch (index) {
    case 0:
      domain = IMG_URL_1;
      break;
    case 1:
      domain = IMG_URL_2;
      break;
    case 2:
      domain = IMG_URL_3;
      break;
  }

 return domain + path + size;
}


var I64BIT_TABLE ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'.split('');

function hashChange(input) {
  var hash = 5381;
  var i = input.length - 1;

  if (typeof input == 'string') {
    for (; i > -1; i--)
      hash += (hash << 5) + input.charCodeAt(i);
  } else {
    for (; i > -1; i--)
      hash += (hash << 5) + input[i];
  }
  var value = hash & 0x7FFFFFFF;

  var retValue = '';
  do {
    retValue += I64BIT_TABLE[value & 0x3F];
  }
  while (value >>= 6);

  return retValue;
}

let formatImage = {
  cdnImage: cdnImage,
  THUMBNAIL_XS: THUMBNAIL_XS,
  THUMBNAIL_S: THUMBNAIL_S,
  THUMBNAIL_M: THUMBNAIL_M,
  THUMBNAIL_L: THUMBNAIL_L
}

export { formatImage }