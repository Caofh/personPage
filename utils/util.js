function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 格式化时间输出 hh:mm:ss
// time 单位为s
function formatTimeHMS (time) {
  if (time <= 0) return false

  let differTimestamp = time
  let deltaHour = Math.floor(differTimestamp / (60 * 60))
  let deltaMinute = Math.floor((differTimestamp % (60 * 60)) / 60)
  let deltaSecond = Math.floor(differTimestamp % 60)
  deltaHour = deltaHour < 10 ? ('0' + deltaHour) : deltaHour
  deltaMinute = deltaMinute < 10 ? ('0' + deltaMinute) : deltaMinute
  deltaSecond = deltaSecond < 10 ? ('0' + deltaSecond) : deltaSecond
  let deltaDate = deltaHour + ':' + deltaMinute + ':' + deltaSecond

  return deltaDate
}
/**
 * formatPrice
 * @params number num  传进来的数字
 * @params number decimals 保留的小数位数，默认保存整数（0位）
 * @return number  处理过的数字
 */

function formatPrice(numbers, bit) {
  let decimals = arguments[1] ? arguments[1] : 0;
  let num = numbers.toFixed(decimals)
  let sign = ','   // 整数部分超过gapnum 以sign作分隔
  let gapnum = 3   // 整数分隔位数
  let integer = num.split('.')[0]        // 四舍五入后的整数部分
  let realdecimals = num.split('.')[1]   // 四舍五入后的小数部分
  let integerArr = integer.split('')
  let str = ''

  for (let i = 1; i <= integerArr.length; i++) {
    str = integerArr[integerArr.length - i] + str

    if (i % gapnum == 0) {
      str = sign + str            // 每隔gapnum位前面加指定符号
    }
  }
  // 当遇到 gapnum 的整数倍时,会出现‘,123’的情况，需要去掉最前面的sign
  str = (integerArr.length % gapnum == 0) ? str.substr(1) : str;

  return realdecimals ? str + '.' + realdecimals : str
}

export { formatTime, formatTimeHMS, formatPrice }

