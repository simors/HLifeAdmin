/**
 * Created by lilu on 2017/3/18.
 */


function initBMapLib() {

}

// var BMapLib = undefined
export function getProviceBaiduMap() {

  let province = []
  if (window.BMapLib) {
    var cityList = new BMapLib.CityList();
    cityList.getSubAreaList(1, function (json) {
      console.log('城市列表');
      console.log(json);
      province = json
    });
    return province
    // cityList.getSubAreaList(27, function(json){
    //   console.log('城市列表');
    //   console.log(json);
    // });
  }

}
export function getCitysByBaiduMap(code) {
  let province = []
  if (window.BMapLib) {
    var cityList = new BMapLib.CityList();
    cityList.getSubAreaList(code, function (json) {
      console.log('城市列表');
      console.log(json);
      province = json
    });
    return province
    // cityList.getSubAreaList(27, function(json){
    //   console.log('城市列表');
    //   console.log(json);
    // });
  }
}

export function getDistrictByBaiduMap(code) {
  let province = []
  if (window.BMapLib) {
    var cityList = new BMapLib.CityList();
    cityList.getSubAreaList(code, function (json) {
      console.log('城市列表');
      console.log(json);
      province = json
    });
    return province
    // cityList.getSubAreaList(27, function(json){
    //   console.log('城市列表');
    //   console.log(json);
    // });
  }
}