/**
 * Created by lilu on 2017/3/16.
 */

import React, { Component,PropTypes } from 'react'
import { Link,routerRedux } from 'dva/router'
import { connect } from 'dva'
import {Button,Tabs,Layout} from 'antd'
import CategoryList from '../../components/ShopManager/CategoryManager/CategoryList'
import {getShopList} from '../../selector/ShopManager/shopSelector'
// import UserSearch from '../../components/users/search'
import CategoryModal from '../../components/ShopManager/CategoryManager/CategoryModal'

import {getProviceBaiduMap,getCitysByBaiduMap,getDistrictByBaiduMap} from '../../services/baiduMap'

const{Header,Content} = Layout

class AppUserManager extends Component{
  constructor(props){
    super(props)

  }
  componentDidMount(){
    this.props.dispatch({type:'appUserManager/query'})
    this.props.dispatch({
      type: 'common/fetchSubAreaList'
    })

  }

  // console.log('personList====>',personList)
  render() {
    // console.log('personList===>',this.props.roleList)
    return (

      <Layout>
        {/*<Header className={styles.Header}>*/}
        {/*</Header>*/}
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

export default connect(mapStateToProps)(AppUserManager)

