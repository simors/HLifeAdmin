/**
 * Created by lilu on 2017/4/22.
 */

import React, {Component, PropTypes} from 'react'
import createG2 from 'g2-react';
import {Stat, Frame} from 'g2';
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
  Slider
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
      level: 3,
    }
  }

  onDateChange(date, dateString) {
    console.log(date, dateString);
    let year = parseInt(dateString.slice(0, 4))
    let month = parseInt(dateString.slice(5, 7))
    // let day = parseInt(dateString.slice(8,10))
    // console.log('year',year,month,day)
    this.setState({
      date: dateString,
      lastYear: year,
      lastMonth: month,
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
      province: liveArea[1],
      city: liveArea[2],
      district: liveArea[3]
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

  onSearchByFilter() {
    // console.log('state', {...this.state})
    this.props.dispatch({
      type: 'promoterStatistics/queryAreaMonthPerformance',
      payload: {
      month:this.state.lastMonth,
      year:this.state.lastYear,
      province: this.state.province,
      city:this.state.city,
      level:this.state.level
      }
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
    // this.props.dispatch({
    //   type:'promoterStatistics/queryMonthPerformance',
    //   payload:{...this.state}
    // })

    // if(this.state.months!=0){
    //   this.props.dispatch({
    //     type:'promoterStatistics/queryArealastMonthsPerformance',
    //     payload:{...this.state}
    //   })
    // }
  }

  onSearchByFilter2() {
    if (this.state.months != 0) {
      this.props.dispatch({
        type: 'promoterStatistics/queryLastMonthsPerformance',
        payload: {...this.state}
      })
    }
  }

  changeLevel(value) {
    this.setState({
      level: parseInt(value)
    })
    console.log('level', this.state.level)
  }

  renderStatistics() {
    if (this.props.areaMonthPerformance && this.props.areaMonthPerformance.length > 0) {
      let area = ''
      // let startMonth = this.props.lastMonthsPerformance[0].month
      if (this.props.areaMonthPerformance[0].level == 1) {
        area = 'district'
      }
      if (this.props.areaMonthPerformance[0].level == 2) {
        area = 'city'
      }
      if (this.props.areaMonthPerformance[0].level == 3) {
        area = 'province'
      }
      var PieEarning = createG2(chart => {
        chart.coord('theta', {radius: 0.8});

        chart.legend({
          title: null,
          position: 'right',
          itemWrap: true,

        })
        chart.intervalStack().position(Stat.summary.percent('earning')).color(area)
          .label(area + '*..percent', function (area, percent) {
            percent = (percent * 100).toFixed(2) + '%';
            return area + ' ' + percent;
          })
        chart.render();
      });
      var PieShopNum = createG2(chart => {
        chart.coord('theta', {radius: 0.8});

        chart.legend({
          title: null,
          position: 'right',
          itemWrap: true,
        });
        chart.intervalStack().position(Stat.summary.percent('shopNum')).color(area)
          .label(area + '*..percent', function (area, percent) {
            percent = (percent * 100).toFixed(2) + '%';
            return area + ' ' + percent;
          })
        chart.render();
      });
      var PiePromoterNum = createG2(chart => {
        chart.coord('theta', {radius: 0.8});

        chart.legend({
          title: null,
          position: 'right',
          itemWrap: true,
        });
        chart.intervalStack().position(Stat.summary.percent('promoterNum')).color(area)
          .label(area + '*..percent', function (area, percent) {
            percent = (percent * 100).toFixed(2) + '%';
            return area + ' ' + percent;
          })
        chart.render();
      });
      return (
        <div>
          <div >{this.props.areaMonthPerformance[0].month}月下辖营业额分布图
            <PieEarning data={this.props.areaMonthPerformance} width={500} height={300}/>
          </div>
          <div >{this.props.areaMonthPerformance[0].month}月下辖店铺分布图
            <PieShopNum data={this.props.areaMonthPerformance} width={500} height={300} ref="myChart"/>
          </div>
          <div >{this.props.areaMonthPerformance[0].month}月下辖推广员分布图
            <PiePromoterNum data={this.props.areaMonthPerformance} width={500} height={300} ref="myChart"/>
          </div>
        </div>
      )
    } else {
      return <div>该月或者该地区无统计数据</div>
    }


  }

  renderStatisticsLocal() {
    if(this.props.lastMonthsPerformance&&this.props.lastMonthsPerformance.length>0){
      let area = ''
      let startMonth = this.props.lastMonthsPerformance[0].month
      if (this.state.level == 1) {
        area = 'district'
      }
      if (this.state.level == 2) {
        area = 'city'
      }
      if (this.state.level == 3) {
        area = 'province'
      }
      let defs={
        'earning':{
          nice:true,
          type:'linear',
        },
        'month':{
          type:'cat',
          tickCount:this.props.lastMonthsPerformance.length
        }
      }
      const LineEarning = createG2(chart => {
        chart.axis('earning', {
          position:'left',
          title: null,
          labels: {
            label: {
              'textAlign': 'start'
            }
          },

          formatter:function (value) {
            return value+'元'
          }
        });
        chart.tooltip({
          title: null,
          map: {
            value: 'earning'
          }
        })
        chart.axis('month', {
          formatter:function (value) {
            return value+'月'
          },
          title: null,
          tickLine:{
            value:5,
            lineWidth:1,
          }
        });
        chart.legend({
          title: null,
          position: 'right',
          itemWrap: true,
        });
        chart.col('month',{
          type:'cat',
          tickCount:this.props.lastMonthsPerformance.length
        })
        chart.col('earning',{
          range:[0,1],
          min:0

        })
        // chart.source(this.props.lastMonthsPerformance,defs)
        chart.line().position('month*earning').color(area).shape('spline').size(2);
        chart.render();
      });
      const LineShopNum = createG2(chart => {
        chart.axis('month', {
          formatter:function (value) {
            return value+'月'
          },
          title: null,
          tickLine:{
            value:this.props.lastMonthsPerformance.length
          }
        });
        chart.tooltip({
          title: null,
          map: {
            value: 'shopNum'
          }
        })
        chart.legend({
          title: null,
          position: 'right',
          itemWrap: true,
        });
        chart.col('month',{
          type:'cat',
          tickCount:this.props.lastMonthsPerformance.length
        })
        chart.col('shopNum',{
          range:[0,1],
          min:0

        })
        chart.line().position('month*shopNum').color(area).shape('spline').size(2);
        chart.render();
      });
      const LinePromoterNum = createG2(chart => {
        chart.axis('month', {
          formatter:function (value) {
            return value+'月'
          },
          title: null,
          tickLine:{
            value:this.props.lastMonthsPerformance.length
          }
        });
        chart.tooltip({
          title: null,
          map: {
            value: 'shopNum'
          }
        })
        chart.legend({
          title: null,
          position: 'right',
          itemWrap: true,
        });
        chart.col('month',{
          type:'cat',
          tickCount:this.props.lastMonthsPerformance.length
        })
        chart.col('promoterNum',{
          range:[0,1],
          min:0

        })
        chart.line().position('month*promoterNum').color(area).shape('spline').size(2);
        chart.render();

      });
      return (
        <div>
          <div>当地{this.state.months}月来营业额
            <LineEarning data={this.props.lastMonthsPerformance} width={600} height={300}/>
          </div>
          <div>当地{this.state.months}月来店铺数量
            <LineShopNum data={this.props.lastMonthsPerformance} width={600} height={300}/>
          </div>
          <div>当地{this.state.months}月来推广人员数量
            <LinePromoterNum data={this.props.lastMonthsPerformance} width={600} height={300}/>
          </div>
        </div>
      )
    }else{
      return <div>没有统计数据</div>
    }

  }

  render() {
    var marks = {
      1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12
    }
    return (
      <Tabs defaultActiveKey='1' className='content-inner'>
        <TabPane tab='地区下辖统计' key='1'>
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
                <Select style={{width: 50}} defaultValue='3' onChange={(value)=> {
                  this.changeLevel(value)
                }}>
                  <Option value='3'>省</Option>
                  <Option value='2'>市</Option>
                  <Option value='1'>区县</Option>


                </Select>
              </Col>

              <Col lg={{offset: 0, span: 6}} style={{marginBottom: 16, textAlign: 'left'}}>
                <p>选择截止日期：</p>
                <div><MonthPicker onChange={(date, dateString)=> {
                  this.onDateChange(date, dateString)
                }}></MonthPicker></div>
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
        <TabPane tab='地区统计' key='2'>
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
                <Select style={{width: 50}} defaultValue='3' onChange={(value)=> {
                  this.changeLevel(value)
                }}>
                  <Option value='3'>省</Option>
                  <Option value='2'>市</Option>
                  <Option value='1'>区县</Option>


                </Select>
              </Col>

              <Col lg={{offset: 0, span: 6}} style={{marginBottom: 16, textAlign: 'left'}}>
                <p>选择起始日期：</p>
                <div><MonthPicker onChange={(date, dateString)=> {
                  this.onDateChange(date, dateString)
                }}></MonthPicker></div>

              </Col>
            </Row>
            <Row gutter={24}>
              <Col lg={{offset: 0, span: 3}} style={{marginBottom: 16, textAlign: 'left'}}>
                <p>统计以往月数：</p>
                <div><Slider style={{width: 500}} defaultValue={1} min={1} marks={marks} step={11} max={12}
                             onChange={(value)=> {
                               this.updateMonths(value)
                             }}></Slider></div>

              </Col>


            </Row>
            <Row gutter={24}> <Col lg={{offset: 0, span: 3}} style={{marginTop: 18, textAlign: 'left'}}>
              <Button type="primary" onClick={()=>this.onSearchByFilter2()}>查询</Button>
            </Col></Row>
            {this.renderStatisticsLocal()}
          </div>
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

  console.log('areaMonthPerformance', areaMonthPerformance)
  return {
    areaTreeSelectData: areaTreeSelectData,
    dayPerformance: dayPerformance,
    lastDaysPerformance: lastDaysPerformance,
    monthPerformance: monthPerformance,
    lastMonthsPerformance: lastMonthsPerformance,
    lastAreaMonthsPerformance: lastAreaMonthsPerformance,
    areaMonthPerformance: areaMonthPerformance
  }
}

export default connect(mapStateToProps)(PromoterStatistics)


