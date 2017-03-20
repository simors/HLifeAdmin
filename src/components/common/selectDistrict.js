/**
 * Created by lilu on 2017/3/18.
 */
import {Select} from 'antd'
import {connect} from 'dva'
import React, {Component} from 'react'
import {getProvinceList} from '../../selector/ActionManager/actionListManager'
import {getCitysByBaiduMap,getDistrictByBaiduMap} from '../../services/baiduMap'
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
    console.log('asdasdasdssssssssss')

    this.props.dispatch({type:'actionListManager/fetchProvinceList'})
this.setState({
  provinceList:this.props.province
})
    // this.props.dispatch({type:'actionListManager/fetchProvinces'})
    // let provinces = yield getProviceBaiduMap()
    // console.log('asdasdasdasdasdasd',provinces)
    // this.setState({
    //   provinceList:provinces
    // })
  }
  handleProvinceChange(value){
    let cities= yield getCitysByBaiduMap(value)
    console.log('cities',cities)
    this.setState({
      selectProvince:value,
      cities:cities
    })
  }
  handleCityChange(value){
    let districts = getDistrictByBaiduMap(value)
    this.setState({
      selectCity:value,
      districts:districts
    })
  }
  handleDistrictChange(value){
    this.setState({
      selectDistrict:value,
    })
  }
  render(){
    let province=[]


       if(this.props.province.length>0){
         province=this.props.province.map((item,key)=>{
            return <Option key={item.area_code}>{item.area_name}</Option>
          }
        )
      }

     // console.log('this.state.province',this.state.provinceList)
    let cities=[]
    if(this.state.cities.length>0){
      cities=this.state.cities.sub.map((item,key)=>{
          return <Option key={item.area_code}>{item.area_name}</Option>
        }
      )
    }
    let districts=[]
    if(this.state.districts.length>0){
      districts=this.state.districts.sub.map((item,key)=>{
          return <Option key={item.area_code}>{item.area_name}</Option>
        }
      )
    }
    return(
      <div>
        <Select defaultValue='省' onChange={(value)=>{this.handleProvinceChange(value)}}>{province}</Select>
        <Select defaultValue='市' onChange={(value)=>{this.handleCityChange(value)}}>{cities}</Select>
        <Select defaultValue='地区' onChange={(value)=>{this.handleDistrictChange(value)}}>{districts}</Select>
      </div>
    )
  }
}


function mapStateToProps(state) {
  let province=getProvinceList(state)
  console.log('<<<<<<<<<province>>>>>>>>>>',province)
  return {
    province:province

  }
}

export default connect(mapStateToProps)(SelectDistrict)
