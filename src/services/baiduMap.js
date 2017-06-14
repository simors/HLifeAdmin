/**
 * Created by lilu on 2017/3/18.
 */


function initBMapLib() {

}

// var BMapLib = undefined
// export async function getProviceBaiduMap() {
// try{
//   let province = []
//
//      var cityList = new BMapLib.CityList();
//   // console.log('here')
//     await cityList.getSubAreaList(1, function (json) {
//       console.log('asdasddasdasd===>',json)
//
//       // province = json
//       // console.log('asdasd----<<<<<<')
//
//       return {success:true,provinces:json}
//
//     });
//
// }catch (err){
//   return {success:false}
// }
//
//
// }
export async function getProviceBaiduMap() {
  try {
    let provinces = []
    let cityList = await new BMamLib.CityList()
    await cityList.getSubAreaList(1,(results)=>{
      console.log('hahahahahahahahahahahhaha',results.sub)

      provinces=results.sub
    })
    return {success:true,provinces:provinces}
  }catch (err){
    return {success:false}
  }
}
export async function getProvinceList() {
  return new Promise((resolve, reject)=>{
    var cityList = new BMapLib.CityList()
    cityList.getSubAreaList(1, (results)=>{
      console.log('hahahahahahahahahahahhaha',results)

      resolve(results)
    })
  })
}

export async function getCitysByBaiduMap(code) {
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

export async function getDistrictByBaiduMap(code) {
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