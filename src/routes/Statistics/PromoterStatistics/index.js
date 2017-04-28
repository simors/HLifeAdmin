/**
 * Created by lilu on 2017/4/22.
 */

import React, {Component, PropTypes} from 'react'
import createG2 from 'g2-react';
import { Stat,Frame } from 'g2';
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import {
  Button,
  Tabs,
  Input,
  Modal,
  DatePicker,
  Row,
  Col,
  Menu,
  Dropdown,
  Icon,
  Cascader,
  Select,
  InputNumber,
} from 'antd'
const {MonthPicker, RangePicker} = DatePicker;
import * as CommonSelect from '../../../selector/CommonSelect'
import * as proStati from '../../../selector/Statistics/promoterStatisticsSelector'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const dateFormat = 'YYYY-MM-DD';
const Option = Select.Option;
const TabPane = Tabs.TabPane


const orderShowTab = {
  'createTimeDescend': '时间降序',
  'createTimeAscend': '时间升序',

}
class PromoterStatistics extends Component {
  constructor(props) {
    super(props)
    this.state = {
      area: [],
      months: 0,
      days: 0,
      lastYear: 2017,
      lastMonth: 1,
      // lastDay:0,
      date: new Date(),
      level:3,
    }
  }

  onDateChange(date, dateString) {
     console.log(date, dateString);
    let year = parseInt(dateString.slice(0,4))
    let month = parseInt(dateString.slice(5,7))
    // let day = parseInt(dateString.slice(8,10))
    // console.log('year',year,month,day)
    this.setState({
      date:dateString,
      lastYear:year,
      lastMonth:month,
      // lastDay:day,
    })


  }

  selectedLiveDistrict(value, selectedOptions) {
    let liveArea = []
    selectedOptions.forEach((record)=> {
      // console.log('record',record)
      liveArea.push(record.label)
    })
    this.setState({
      area: liveArea,
      province:liveArea[1],
      city:liveArea[2],
      district:liveArea[3]
    })

     // console.log('hahahahahahah',value,selectedOptions)
  }

  updateMonths(value) {
    this.setState({
      months: value
    })
  }

  updateDays(value) {
    this.setState({
      days: value
    })
  }
  onSearchByFilter(){
      console.log('state',{...this.state})
    this.props.dispatch({
      type:'promoterStatistics/queryAreaMonthPerformance',
      payload:{...this.state}
    })
    // this.props.dispatch({
    //   type:'promoterStatistics/queryDaliyPerformance',
    //   payload:{...this.state}
    // })
    // if(this.state.days!=0) {
    //   this.props.dispatch({
    //     type: 'promoterStatistics/queryLastDaysPerformance',
    //     payload: {...this.state}
    //   })
    // }
    this.props.dispatch({
      type:'promoterStatistics/queryMonthPerformance',
      payload:{...this.state}
    })
    if(this.state.months!=0) {
      this.props.dispatch({
        type: 'promoterStatistics/queryLastMonthsPerformance',
        payload: {...this.state}
      })
    }
    if(this.state.months!=0){
      this.props.dispatch({
        type:'promoterStatistics/queryArealastMonthsPerformance',
        payload:{...this.state}
      })
    }

  }
  changeLevel(value){
    this.setState({
      level:parseInt(value)
    })
    console.log('level',this.state.level)
  }
  renderStatistics(){
    console.log('dayPerformance',this.props.dayPerformance)
    console.log('lastDaysPerformance',this.props.lastDaysPerformance)
    console.log('monthPerformance',this.props.monthPerformance)
    console.log('lastMonthsPerformance',this.props.lastMonthsPerformance)
    console.log('lastAreaMonthsPerformance',this.props.lastAreaMonthsPerformance)
    console.log('areaMonthPerformance',this.props.areaMonthPerformance)
    // create the chart object
    var PieEarning = createG2(chart => {
      chart.coord('theta',{radius: 0.8});
      // chart.tooltip({
      //   title: null,
      //   map: {
      //     earning: 'earning'
      //   }
      // });
      chart.legend('city', {
        position: 'bottom',
        itemWrap: true,
        // formatter: function(val) {
        //   for(var i = 0, len = data.length; i < len; i++) {
        //     var obj = data[i];
        //     if (obj.city === val) {
        //       return val + ': ' + obj.value + '%';
        //     }
        //   }
        // }
      });
      chart.intervalStack().position(Stat.summary.percent('earning')).color('city')
        .label('city*..percent',function(city, percent){
        percent = (percent * 100).toFixed(2) + '%';
        return city + ' ' + percent;
      }).selected({
        mode: 'multiple' // 设置 geom 的选择模式
      });
      chart.render();
    });
    var PieShopNum = createG2(chart => {
      chart.coord('theta',{radius: 0.8});
      chart.legend('city', {
        position: 'bottom',
        itemWrap: true,
        // formatter: function(val) {
        //   for(var i = 0, len = data.length; i < len; i++) {
        //     var obj = data[i];
        //     if (obj.city === val) {
        //       return val + ': ' + obj.value + '%';
        //     }
        //   }
        // }
      });
      chart.intervalStack().position(Stat.summary.percent('shopNum')).color('city')
        .label('city*..percent',function(city, percent){
          percent = (percent * 100).toFixed(2) + '%';
          return city + ' ' + percent;
        }).selected({
        mode: 'multiple' // 设置 geom 的选择模式
      });
      chart.render();
    });
    var PiePromoterNum = createG2(chart => {
      chart.coord('theta',{radius: 0.8});
      chart.legend('city', {
        position: 'bottom',
        itemWrap: true,
        // formatter: function(val) {
        //   for(var i = 0, len = data.length; i < len; i++) {
        //     var obj = data[i];
        //     if (obj.city === val) {
        //       return val + ': ' + obj.value + '%';
        //     }
        //   }
        // }
      });
      chart.intervalStack().position(Stat.summary.percent('promoterNum')).color('city')
        .label('city*..percent',function(city, percent){
          percent = (percent * 100).toFixed(2) + '%';
          return city + ' ' + percent;
        }).selected({
        mode: 'multiple' // 设置 geom 的选择模式
      });
      chart.render();
    });
   return (
     <div>
     <div >{this.props.areaMonthPerformance[0].month}月下辖营业额分布图
     <PieEarning data ={this.props.areaMonthPerformance} width={300} height={300} ref = "myChart"/>
       </div>
     <div >{this.props.areaMonthPerformance[0].month}月下辖店铺分布图
    <PieShopNum data ={this.props.areaMonthPerformance} width={300} height={300} ref = "myChart"/>
      </div>
      <div >{this.props.areaMonthPerformance[0].month}月下辖推广员分布图
    <PiePromoterNum data ={this.props.areaMonthPerformance} width={300} height={300} ref = "myChart"/>
      </div>
       </div>
   )

  }
  render() {
    return (
      <Tabs defaultActiveKey='1' className='content-inner'>
        <TabPane tab='当地统计' key='1'>
      <div>
        <Row gutter={24}>

          <Col lg={{offset: 0, span: 6}} style={{marginBottom: 16, textAlign: 'left'}}>
            <p>选择用户所在地区</p>
            <Cascader
              options={this.props.areaTreeSelectData}
              changeOnSelect
              placeholder="请选择生活地区地区"
              onChange={(value, selectedOptions)=> {
                this.selectedLiveDistrict(value, selectedOptions)
              }}
            />
          </Col>
          <Col lg={{offset: 0, span: 3}} style={{marginBottom: 16, textAlign: 'left'}}>
            <p>选择区域：</p>
            <Select style={{width:50}} defaultValue='3' onChange={(value)=> {
              this.changeLevel(value)
            }}>
              <Option value='3'>省</Option>
              <Option value='2'>市</Option>
              <Option value='1'>区县</Option>


            </Select>
          </Col>

          <Col lg={{offset: 0, span: 6}} style={{marginBottom: 16, textAlign: 'left'}}>
            <p>选择截止日期：</p>
            <div><MonthPicker onChange={(date,dateString)=>{this.onDateChange(date,dateString)}}></MonthPicker></div>

          </Col>
          <Col lg={{offset: 0, span: 3}} style={{marginBottom: 16, textAlign: 'left'}}>
            <p>统计月数：</p>
            <div><InputNumber defaultValue={0} max = {12} onChange={(value)=>{this.updateMonths(value)}}></InputNumber></div>

          </Col>
          <Col lg={{offset: 0, span: 3}} style={{marginBottom: 16, textAlign: 'left'}}>
            <p>统计天数：</p>
            <div><InputNumber defaultValue={0} onChange={(value)=>{this.updateDays(value)}}></InputNumber></div>

          </Col>
          <Col lg={{offset: 0, span: 3}} style={{marginTop: 18, textAlign: 'left'}}>
            <Button type="primary" onClick={()=>this.onSearchByFilter()}>查询</Button>
          </Col>

        </Row>
        {this.renderStatistics()}
        {/*<div>hahhaha</div>*/}
        <div id="c1"></div>

      </div>
          </TabPane>
        <TabPane tab='当地下辖统计' key='2'>
          </TabPane>
        </Tabs>
    )
  }
}


function mapStateToProps(state) {


  const areaTreeSelectData = CommonSelect.selectAreaTreeSelectData(state)
  const dayPerformance = proStati.getDaliyPerformance(state)
  const lastDaysPerformance = proStati.getLastDaysPerformance(state)
  const monthPerformance = proStati.getMonthPerformance(state)
  const lastMonthsPerformance = proStati.getLastMonthsPerformance(state)
  const areaMonthPerformance = proStati.getAreaMonthPerformance(state)
  const lastAreaMonthsPerformance = proStati.getArealastMonthsPerformance(state)

   console.log('lastAreaMonthsPerformance',lastAreaMonthsPerformance)
  return {areaTreeSelectData: areaTreeSelectData,dayPerformance:dayPerformance,lastDaysPerformance:lastDaysPerformance,monthPerformance:monthPerformance,
    lastMonthsPerformance:lastMonthsPerformance,lastAreaMonthsPerformance:lastAreaMonthsPerformance,areaMonthPerformance:areaMonthPerformance}
}

export default connect(mapStateToProps)(PromoterStatistics)


