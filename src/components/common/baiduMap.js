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
        // console.log('getSubAreaList====>>>>>', results);
        if(results && results.sub && results.sub.length) {
          resolve(results.sub)
        }else {
          resolve([])
        }
      });
    }else {
      resolve([])
    }
  })
}
