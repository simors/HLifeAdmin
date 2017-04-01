/**
 * Created by lilu on 2017/4/1.
 */

import React, {Component, PropTypes} from 'react'
import {Link, routerRedux} from 'dva/router'
import {connect} from 'dva'
import {Button, Tabs, Layout} from 'antd'
// import UserSearch from '../../components/users/search'
import styles from './PromoterAgenManager.less'
// const TabPane = Tabs.TabPane;
const {Header, Content} = Layout

class PromoterAgentManager extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
     this.props.dispatch({type: 'promoterAgentSet/query', })
  }

  // console.log('personList====>',personList)
  render() {
    // console.log('personList===>',this.props.roleList)

    return (

      <Layout>
        <Header className={styles.Header}>
          <Link className={styles.Linker} to={{
            pathname: "/promoterManager/promoterAgentSet",
          }} style={{
            marginRight: 4
          }}>添加代理</Link>
          <Link className={styles.Linker} to={{
            pathname: "/promoterManager/promoterAgentSet/agentManager",
          }} style={{
            marginRight: 4
          }}>代理管理</Link>

        </Header>
        <Content>
          {this.props.children}
        </Content>
      </Layout>
    )
  }
}

function mapStateToProps(state) {

  return {}
}

export default connect(mapStateToProps)(PromoterAgentManager)

