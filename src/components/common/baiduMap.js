/**
 * Created by lilu on 2017/3/18.
 */


function initBMapLib() {

}

// var BMapLib = undefined
export function getProviceBaiduMap() {
  // var map = new BMap.Map("map_container");
  // console.log('map',map)
  // map.centerAndZoom(new BMap.Point(121.478125,31.229649), 12);
  //
  // var cityList = new BMapLib.CityList({
  //   container: 'container',
  //   map: map
  // });
  //
  // cityList.getBusiness('中关村', function(json){
  //   console.log('商圈');
  //   console.log(json);
  // });
  //
  // cityList.getSubAreaList(131, function(json){
  //   console.log('城市列表');
  //   console.log(json);
  // });
  //
  // cityList.addEventListener('cityclick', function(e){
  //   console.log(e);
  // });
  // console.log('asdasd',BMapLib)
  let province=[]
  if(window.BMapLib) {
    var cityList = new BMapLib.CityList();
    cityList.getSubAreaList(1, function(json){
      console.log('城市列表');
      console.log(json);
      province=json
    });
    return province
    // cityList.getSubAreaList(27, function(json){
    //   console.log('城市列表');
    //   console.log(json);
    // });
  }

}
export function getCitysByBaiduMap(code){
  let province=[]
  if(window.BMapLib) {
    var cityList = new BMapLib.CityList();
    cityList.getSubAreaList(code, function(json){
      console.log('城市列表');
      console.log(json);
      province=json
    });
    return province
    // cityList.getSubAreaList(27, function(json){
    //   console.log('城市列表');
    //   console.log(json);
    // });
  }
}

export function getDistrictByBaiduMap(code){
  let province=[]
  if(window.BMapLib) {
    var cityList = new BMapLib.CityList();
    cityList.getSubAreaList(code, function(json){
      console.log('城市列表');
      console.log(json);
      province=json
    });
    return province
    // cityList.getSubAreaList(27, function(json){
    //   console.log('城市列表');
    //   console.log(json);
    // });
  }
}