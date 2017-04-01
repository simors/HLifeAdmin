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

class AddAgent extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
      <PromoterAgentManager>
        <div>
          <PromoterList dataSource={this.props.promoterList}/>
        </div>
      </PromoterAgentManager>
    )
  }
}
function mapStateToProps(state) {
  let promoterList = getPromoterList(state)
  return {
    promoterList:promoterList
  }
}

export default connect(mapStateToProps)(AddAgent)