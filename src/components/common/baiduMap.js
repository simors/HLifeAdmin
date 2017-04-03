/**
 * Created by lilu on 2017/3/18.
 */

export function getProviceList() {
  return getSubAreaList(1)
}
export function getCityList(provinceCode) {
  return getSubAreaList(provinceCode)
}

export function getDistrictList(cityCode) {
  return getSubAreaList(cityCode)
}

export function getSubAreaList(areaCode) {
  return new Promise((resolve, reject) => {
    if (window.BMapLib && areaCode) {
      var cityList = new BMapLib.CityList();
      cityList.getSubAreaList(areaCode, function (results) {
        if(results && results.sub && results.sub.length) {
          resolve(areaAbbr((areaCode == 1) ? 1 : 2, results))
        }else {
          resolve([])
        }
      });
    }else {
      resolve([])
    }
  })
}

function areaAbbr(level, area) {
  var areaJson = area
  if (level == 1) {
    areaJson = abbrProvince(area)
  } else {
    areaJson = abbrCity(area)
  }
  return areaJson.sub
}

function abbrProvince(area) {
  var areaJson = area
  var i = 0
  for (i = 0; i < areaJson.sub.length; i++) {
    var provinceSub = areaJson.sub[i]
    if (provinceSub.area_name.endsWith('省')) {
      areaJson.sub[i].area_name = provinceSub.area_name.substring(0, provinceSub.area_name.lastIndexOf('省'))
    } else if (provinceSub.area_name.endsWith('市')) {
      areaJson.sub[i].area_name = provinceSub.area_name.substring(0, provinceSub.area_name.lastIndexOf('市'))
    } else if (provinceSub.area_name.startsWith('新疆')) {
      areaJson.sub[i].area_name = '新疆'
    } else if (provinceSub.area_name.startsWith('广西')) {
      areaJson.sub[i].area_name = '广西'
    } else if (provinceSub.area_name.startsWith('宁夏')) {
      areaJson.sub[i].area_name = '宁夏'
    } else if (provinceSub.area_name.startsWith('内蒙古')) {
      areaJson.sub[i].area_name = '内蒙古'
    } else if (provinceSub.area_name.startsWith('西藏')) {
      areaJson.sub[i].area_name = '西藏'
    } else if (provinceSub.area_name.startsWith('澳门')) {
      areaJson.sub[i].area_name = '澳门'
    } else if (provinceSub.area_name.startsWith('香港')) {
      areaJson.sub[i].area_name = '香港'
    }
  }
  return areaJson
}

function abbrCity(area) {
  var areaJson = area
  var i = 0
  for (i = 0; i < areaJson.sub.length; i++) {
    var citySub = areaJson.sub[i]
    if (citySub.area_name.endsWith('市')) {
      areaJson.sub[i].area_name = citySub.area_name.substring(0, citySub.area_name.lastIndexOf('市'))
    } else if (citySub.area_name.endsWith('地区')) {
      areaJson.sub[i].area_name = citySub.area_name.substring(0, citySub.area_name.lastIndexOf('地区'))
    } else if (citySub.area_name.startsWith('临夏')) {
      areaJson.sub[i].area_name = '临夏'
    } else if (citySub.area_name.startsWith('甘南')) {
      areaJson.sub[i].area_name = '甘南'
    } else if (citySub.area_name.startsWith('延边')) {
      areaJson.sub[i].area_name = '延边'
    } else if (citySub.area_name.startsWith('海西')) {
      areaJson.sub[i].area_name = '海西'
    } else if (citySub.area_name.startsWith('海北')) {
      areaJson.sub[i].area_name = '海北'
    } else if (citySub.area_name.startsWith('海南')) {
      areaJson.sub[i].area_name = '海南'
    } else if (citySub.area_name.startsWith('黄南')) {
      areaJson.sub[i].area_name = '黄南'
    } else if (citySub.area_name.startsWith('玉树')) {
      areaJson.sub[i].area_name = '玉树'
    } else if (citySub.area_name.startsWith('果洛')) {
      areaJson.sub[i].area_name = '果洛'
    } else if (citySub.area_name.startsWith('克孜勒苏柯尔克孜')) {
      areaJson.sub[i].area_name = '克孜勒'
    } else if (citySub.area_name.startsWith('巴音郭楞')) {
      areaJson.sub[i].area_name = '巴音郭楞'
    } else if (citySub.area_name.startsWith('博尔塔拉')) {
      areaJson.sub[i].area_name = '博尔塔拉'
    } else if (citySub.area_name.startsWith('伊犁')) {
      areaJson.sub[i].area_name = '伊犁'
    } else if (citySub.area_name.startsWith('昌吉')) {
      areaJson.sub[i].area_name = '昌吉'
    } else if (citySub.area_name.startsWith('恩施')) {
      areaJson.sub[i].area_name = '恩施'
    } else if (citySub.area_name.startsWith('神农架')) {
      areaJson.sub[i].area_name = '神农架'
    } else if (citySub.area_name.startsWith('保亭')) {
      areaJson.sub[i].area_name = '保亭'
    } else if (citySub.area_name.startsWith('昌江')) {
      areaJson.sub[i].area_name = '昌江'
    } else if (citySub.area_name.startsWith('陵水')) {
      areaJson.sub[i].area_name = '陵水'
    } else if (citySub.area_name.startsWith('琼中')) {
      areaJson.sub[i].area_name = '琼中'
    } else if (citySub.area_name.startsWith('乐东')) {
      areaJson.sub[i].area_name = '乐东'
    } else if (citySub.area_name.startsWith('白沙')) {
      areaJson.sub[i].area_name = '白沙'
    } else if (citySub.area_name.startsWith('锡林郭勒')) {
      areaJson.sub[i].area_name = '锡林郭勒'
    } else if (citySub.area_name.startsWith('黔南')) {
      areaJson.sub[i].area_name = '黔南'
    } else if (citySub.area_name.startsWith('黔东')) {
      areaJson.sub[i].area_name = '黔东'
    } else if (citySub.area_name.startsWith('黔西')) {
      areaJson.sub[i].area_name = '黔西'
    } else if (citySub.area_name.startsWith('湘西')) {
      areaJson.sub[i].area_name = '湘西'
    } else if (citySub.area_name.startsWith('楚雄')) {
      areaJson.sub[i].area_name = '楚雄'
    } else if (citySub.area_name.startsWith('红河')) {
      areaJson.sub[i].area_name = '红河'
    } else if (citySub.area_name.startsWith('西双版纳')) {
      areaJson.sub[i].area_name = '西双版纳'
    } else if (citySub.area_name.startsWith('大理')) {
      areaJson.sub[i].area_name = '大理'
    } else if (citySub.area_name.startsWith('怒江')) {
      areaJson.sub[i].area_name = '怒江'
    } else if (citySub.area_name.startsWith('迪庆')) {
      areaJson.sub[i].area_name = '迪庆'
    } else if (citySub.area_name.startsWith('德宏')) {
      areaJson.sub[i].area_name = '德宏'
    } else if (citySub.area_name.startsWith('文山')) {
      areaJson.sub[i].area_name = '文山'
    } else if (citySub.area_name.startsWith('甘孜')) {
      areaJson.sub[i].area_name = '甘孜'
    } else if (citySub.area_name.startsWith('凉山')) {
      areaJson.sub[i].area_name = '凉山'
    } else if (citySub.area_name.startsWith('阿坝')) {
      areaJson.sub[i].area_name = '阿坝'
    } else if (citySub.area_name.startsWith('彭水')) {
      areaJson.sub[i].area_name = '彭水'
    } else if (citySub.area_name.startsWith('秀山')) {
      areaJson.sub[i].area_name = '秀山'
    } else if (citySub.area_name.startsWith('酉阳')) {
      areaJson.sub[i].area_name = '酉阳'
    } else if (citySub.area_name.startsWith('石柱')) {
      areaJson.sub[i].area_name = '石柱'
    } else if (citySub.area_name.startsWith('酉阳')) {
      areaJson.sub[i].area_name = '酉阳'
    }
  }
  return areaJson
}