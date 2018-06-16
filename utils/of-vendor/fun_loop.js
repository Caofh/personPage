/**
 * Created by caofanghui on 3/19/17.
 */


/*函数式编程循环方法---(obj = null:精髓，解决闭包引起的内存泄漏问题.)
 //var obj = [11, 12, 13, 14, 15]
 //obj = {
 //    a: 1,
 //    b: 2,
 //    c: 3,
 //    d: 4,
 //    e: 5
 //}
 //obj = $('.loop > .item')
 //obj = 'abcde'

 var obj = $('.loop .item')
 fun_loop(obj)(function (index, value) {
 console.log(index, value)
 //console.log(index, value, key) //如果obj为对象的话，会多返回来一个对象的key值
 })
 */

//-----------

export default function fun_loop(obj) { //obj,arr,$('.dev'),'abcde'
  var fun

  if (obj instanceof Array || typeof obj === 'string') {
    fun = function (callback) {
      var length = obj.length
      for (var i = 0; i < length; i++) {
        var result
        callback && (result = callback(i, obj[i]))
        if (result == false || result == 'break') {
          break
        }
      }

      obj = null
    }
  } else if (obj instanceof $) {
    fun = function (callback) {
      obj.each(function (index, element) {
        var result
        callback && (result = callback(index, $(element)))
        if (result == false || result == 'break') {
          return false
        }
      })

      obj = null
    }
  } else if (obj instanceof Object) {
    fun = function (callback) {
      var i = 0
      for (var key in obj) {
        var result
        callback && (result = callback(i, obj[key], key))
        if (result == false || result == 'break') {
          break
        }
        i++
      }

      obj = null
    }
  } else {
    fun = function () {
      console.log('输入格式有误')
    }
  }

  return fun
}



