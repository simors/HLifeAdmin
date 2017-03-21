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
  handleProvinceChange(value){
    // let cities= yield getCitysByBaiduMap(value)
    // let dirCity=[2911,2912,131,289,132,332]
    console.log('key',value)
    switch(value.key){
      case '2911':
        getDistrictList(value.key).then((results)=>{

          const districtList = results.map((item,key)=>{
            return <Option  key={item.area_code} >{item.area_name}</Option>
          })
          this.setState({
            cities:<Option key={value.key} >{value.label}</Option>,
            selectCity:value.label,
            districts:districtList,
          })

        })
        break
      case '2912':
        getDistrictList(value.key).then((results)=>{

          const districtList = results.map((item,key)=>{
            return <Option  key={item.area_code} >{item.area_name}</Option>
          })
          this.setState({
            cities:<Option key={value.key} >{value.label}</Option>,
            selectCity:value.label,
            districts:districtList,
          })

        })
        break
      case '131':
        getDistrictList(value.key).then((results)=>{

          const districtList = results.map((item,key)=>{
            return <Option  key={item.area_code} >{item.area_name}</Option>
          })
          this.setState({
            cities:<Option key={value.key} >{value.label}</Option>,
            selectCity:value.label,
            districts:districtList,
          })

        })
        break
      case '289':
        getDistrictList(value.key).then((results)=>{

          const districtList = results.map((item,key)=>{
            return <Option  key={item.area_code} >{item.area_name}</Option>
          })
          this.setState({
            cities:<Option key={value.key} >{value.label}</Option>,
            selectCity:value.label,
            districts:districtList,
          })

        })
        break
      case '132':
        getDistrictList(value.key).then((results)=>{

          const districtList = results.map((item,key)=>{
            return <Option  key={item.area_code} >{item.area_name}</Option>
          })
          this.setState({
            cities:<Option key={value.key} >{value.label}</Option>,
            selectCity:value.label,
            districts:districtList,
          })

        })
        break
      case '332':
        getDistrictList(value.key).then((results)=>{

          const districtList = results.map((item,key)=>{
            return <Option  key={item.area_code} >{item.area_name}</Option>
          })
          this.setState({
            cities:<Option key={value.key} >{value.label}</Option>,
            selectCity:value.label,
            districts:districtList,
          })

        })
        break
      default:
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

    // dirCity.forEach((result)=>{
    //   if(value.key==result){
    //
    //   }else{
    //
    //   }
    // })
     // console.log('value',value)
     // console.log('as',as)


  }
  handleCityChange(value){
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
  handleDistrictChange(value){
    console.log('value',value)

      this.setState({
      selectDistrict:value.label,
      districts:this.state.districts
    })
    console.log('state',this.state.selectProvince,
      this.state.selectCity,
      this.state.selectDistrict)
this.props.submit({
  city:this.state.selectCity,
  district:value.label
})
  }
  render(){
    let province=[]
// console.log('citys',this.state.selectProvince,this.state.selectCity,this.state.selectDistrict)

      //  if(this.props.province.length>0){
      //    province=this.props.province.map((item,key)=>{
      //       return <Option key={item.area_code}>{item.area_name}</Option>
      //     }
      //   )
      // }
// let city = this.state.cities
    // console.log('cities',city)
     // console.log('this.state.province',this.state.provinceList)

    return(
      <div>
        <Select style={{width:100}} defaultValue={{key:'省',value:'省'}} labelInValue onChange={(value,key)=>{this.handleProvinceChange(value,key)}}>{this.state.provinceList}</Select>
        <Select style={{width:100}} defaultValue={this.props.city?{key:this.props.city,value:this.props.city}:{key:'市',value:'市'}} labelInValue onChange={(value)=>{this.handleCityChange(value)}}>{this.state.cities}</Select>
        <Select style={{width:100}} defaultValue={this.props.district?{key:this.props.district,value:this.props.district}:{key:'地区',value:'地区'}} labelInValue onChange={(value)=>{this.handleDistrictChange(value)}}>{this.state.districts}</Select>
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
