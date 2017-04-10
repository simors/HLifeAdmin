/**
 * Created by wanpeng on 2017/4/10.
 */

import React, {Component, PropTypes} from 'react'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import {getCommissionCof} from '../../selector/PromoterManager/PromoterCommissionSelector'
import * as CommonSelect from '../../selector/CommonSelect'

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
      liveArea: [],
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
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const areaTreeSelectData = CommonSelect.selectAreaTreeSelectData(state)
  return {
    areaTreeSelectData:areaTreeSelectData
  }
}
export default connect(mapStateToProps)(TenantFeeManager)

