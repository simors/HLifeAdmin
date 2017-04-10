/**
 * Created by wanpeng on 2017/4/10.
 */

import React, {Component, PropTypes} from 'react'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import {getCommissionCof} from '../../selector/PromoterManager/PromoterCommissionSelector'
import {getTenantFeeList} from '../../selector/PromoterManager/tenantFeeManagerSelector'
import TenantFeeModal from '../../components/PromoterManager/TenantFee/TenantFeeModal'
import * as CommonSelect from '../../selector/CommonSelect'
import TenantFeeList from '../../components/PromoterManager/TenantFee/TenantFeeList'

import {
  Radio,
  Checkbox,
  InputNumber,
  Select,
  Tag,
  Cascader,
  TreeSelect,
  Button,
  Upload,
  message,
  Tabs,
  Input,
  DatePicker,
  Row,
  Col,
  Menu,
  Dropdown,
  Icon,
  Layout
} from 'antd'
import style from './TenantFeeManager.less'


class TenantFeeManager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      liveArea: [],
      selectedItem: {},

    }
  }

  componentDidMount() {

  }

  selectedLiveDistrict(value, selectedOptions) {
    let liveArea = []
    selectedOptions.forEach((record)=> {
      console.log('record',record)
      liveArea.push(record.label)
    })
    this.setState({
      liveArea: liveArea
    })
  }

  onSearchByFilter() {
    console.log("tenantFeeManager/query: liveArea", this.state.liveArea)
    this.props.dispatch({
      type: 'tenantFeeManager/query',
      payload: {
        province: this.state.liveArea[1],
        city: this.state.liveArea[2],
        orderType: 'provinceOrder',
      }
    })
  }

  onModify(data) {
    this.setState({modalVisible: true, selectedItem: data})
  }

  onCancel() {
    this.setState({modalVisible: false, modalKey:this.state.modalKey-1})
  }

  onOk(data){
    console.log('data====>',data)

    this.props.dispatch({
      type:'tenantFeeManager/update',
      payload:data
    })

    this.setState({modalVisible:false, modalKey:this.state.modalKey-1})
  }

  render() {
    return(
      <div className='content-inner'>
        <Row gutter={24}>
          <Col lg={{offset: 0, span: 5}} style={{marginBottom: 16, textAlign: 'left'}}>
            <p>选择代理区域</p>
            <Cascader
              options={this.props.areaTreeSelectData}
              changeOnSelect
              placeholder="请选择代理区域"
              onChange={(value, selectedOptions)=> {
                this.selectedLiveDistrict(value, selectedOptions)
              }}
            />
          </Col>
          <Col lg={{offset: 0, span: 2}} style={{marginTop: 18, textAlign: 'left'}}>
            <Button type="primary" onClick={()=>this.onSearchByFilter()}>查询</Button>
          </Col>

        </Row>
        <TenantFeeList dataSource={this.props.tenantFeeList}
                       onEditItem={(payload)=> {
                         this.onModify(payload)
                       }}
        />
        <TenantFeeModal
          modalKey={this.state.modalKey}
          visible={this.state.modalVisible}
          onOk={(payload)=> {
            this.onOk(payload)
          }}
          onCancel={()=> {
            this.onCancel()
          }}
          item={this.state.selectedItem}
        />

      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let tenantFeeList = getTenantFeeList(state)
  const areaTreeSelectData = CommonSelect.selectAreaTreeSelectData(state)
  return {
    areaTreeSelectData:areaTreeSelectData,
    tenantFeeList: tenantFeeList,
  }
}
export default connect(mapStateToProps)(TenantFeeManager)

