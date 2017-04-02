/**
 * Created by lilu on 2017/4/1.
 */
import React, {Component, PropTypes} from 'react'
import {Link, routerRedux} from 'dva/router'
import {connect} from 'dva'
import {Button, Tabs, Layout} from 'antd'
import PromoterAgentManager from './PromoterAgentManager'
import {getPromoterList} from '../../selector/PromoterManager/promoterAgentSelector'
import PromoterList from '../../components/PromoterManager/PromoterAgent/PromoterList'
import AgentModal from '../../components/PromoterManager/PromoterAgent/AgentModal'
import * as CommonSelect from '../../selector/CommonSelect'

class AddAgent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      promoterId: ''
    }
  }

  componentDidMount() {
    this.props.dispatch({type: 'promoterAgentSet/query',})
    this.props.dispatch({
      type: 'common/fetchSubAreaList'
    })
  }

  onOk(data) {
    // console.log('data=====>',data)
    this.props.dispatch({type: 'promoterAgentSet/agentAdd', payload: {...data, promoterId: this.state.promoterId}})
    this.setState({
      modalVisible: false
    })
  }

  openVisible(record) {

    this.setState({
      promoterId: record,
      modalVisible: true
    })
  }

  onCancel() {
    this.setState({
      modalVisible: false
    })
  }

  render() {
    return (
      <PromoterAgentManager>
        <div>
          <PromoterList dataSource={this.props.promoterList} onEditItem={(record)=> {
            this.openVisible(record)
          }}/>
          <AgentModal visible={this.state.modalVisible} areaTreeSelectData={this.props.areaTreeSelectData}
                      onOk={(data)=> {
                        this.onOk(data)
                      }} onCancel={()=> {
            this.onCancel()
          }}/>
        </div>
      </PromoterAgentManager>
    )
  }
}
function mapStateToProps(state) {
  let promoterList = getPromoterList(state)
  const areaTreeSelectData = CommonSelect.selectAreaTreeSelectData(state)

  return {
    promoterList: promoterList, areaTreeSelectData: areaTreeSelectData
  }
}

export default connect(mapStateToProps)(AddAgent)