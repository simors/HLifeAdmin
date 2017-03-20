/**
 * Created by lilu on 2017/3/18.
 */
import {Select} from 'antd'
import {connect} from 'dva'
import React, {Component} from 'react'
import {getProvinceList} from '../../selector/ActionManager/actionListManager'
import {getCitysByBaiduMap,getDistrictByBaiduMap} from '../../services/baiduMap'
import {getCityList,getDistrictList,getProviceList} from './baiduMap'
const Option = Select.Option;

 class SelectDistrict extends Component{
  constructor(props){
    super(props)
    // let provinces = getProvinceList()

    this.state={
      provinceList:[],
      cities:[],
      districts:[],
      selectProvince:{},
      selectCity:{},
      selectDistrict:{
      }
    }
    // console.log('provinces======>',provinces)

  }
  componentDidMount(){
    // console.log('asdasdasdssssssssss')
getProviceList().then((result)=>{
  // console.log('asdasdasdssssssssss',result)

  const provinceList = result.map((item,key)=>{
      return <Option  key={item.area_code} >{item.area_name}</Option>
    }
  )
  this.setState({
    provinceList:provinceList
  })
})
    // this.props.dispatch({type:'actionListManager/fetchProvinceList'})

    // this.props.dispatch({type:'actionListManager/fetchProvinces'})
    // let provinces = yield getProviceBaiduMap()
    // console.log('asdasdasdasdasdasd',provinces)
    // this.setState({
    //   provinceList:provinces
    // })
  }
  handleProvinceChange(value,as){
    // let cities= yield getCitysByBaiduMap(value)
    console.log('value',value.key)
     // console.log('as',as)
    getCityList(value.key).then((results)=>{
       // console.log('asdasdasdssssssssss',results)

      const cityList = results.map((item,key)=>{
          return <Option key={item.area_code} >{item.area_name}</Option>
        }
      )
      this.setState({
        selectProvince:value.label,
        cities:cityList
      })
    })

  }
  handleCityChange(value,as){
    getCityList(value.key).then((results)=>{
       // console.log('asdasdasdssssssssss',results)

      const districtList = results.map((item,key)=>{
          return <Option  key={item.area_code} >{item.area_name}</Option>
        }
      )
      this.setState({
        selectCity:value.label,
        districts:districtList
      })
    })
  }
  handleDistrictChange(value,as){
    this.setState({
      selectDistrict:value.label,
    })
    console.log('state',this.state.selectProvince,
      this.state.selectCity,
      this.state.selectDistrict)
  }
  render(){
    let province=[]


      //  if(this.props.province.length>0){
      //    province=this.props.province.map((item,key)=>{
      //       return <Option key={item.area_code}>{item.area_name}</Option>
      //     }
      //   )
      // }

     // console.log('this.state.province',this.state.provinceList)

    return(
      <div>
        <Select style={{width:100}} defaultValue={{value:'省'}} labelInValue onChange={(value,key)=>{this.handleProvinceChange(value,key)}}>{this.state.provinceList}</Select>
        <Select style={{width:100}} defaultValue={{value:'市'}} labelInValue onChange={(value)=>{this.handleCityChange(value)}}>{this.state.cities}</Select>
        <Select style={{width:100}} defaultValue={{value:'地区'}} labelInValue onChange={(value)=>{this.handleDistrictChange(value)}}>{this.state.districts}</Select>
      </div>
    )
  }
}


function mapStateToProps(state) {
  let province=getProvinceList(state)
  // console.log('<<<<<<<<<province>>>>>>>>>>',province)
  return {
    province:province

  }
}

export default connect(mapStateToProps)(SelectDistrict)
