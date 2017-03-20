/**
 * Created by lilu on 2017/2/28.
 */
/**
 * Created by lilu on 2017/2/18.
 */
import React, {Component, PropTypes} from 'react'
import {Link, routerRedux} from 'dva/router'
import {connect} from 'dva'
import {Button, Tabs, Layout} from 'antd'
import CategoryList from '../../components/ShopManager/CategoryManager/CategoryList'
import {getCategoryList, getTagList} from '../../selector/ShopManager/categorySelector'
// import UserSearch from '../../components/users/search'
import CategoryModal from '../../components/ShopManager/CategoryManager/CategoryModal'
import styles from './CategoryManager.less'
// const TabPane = Tabs.TabPane;
const {Header, Content} = Layout

class categoryManager extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    this.props.dispatch({type: 'shopCategoryManager/query', payload: {status: 1}})
  }

  // console.log('personList====>',personList)
  render() {
    // console.log('personList===>',this.props.roleList)

    return (

      <Layout>
        <Header className={styles.Header}>
          <Link className={styles.Linker} to={{
            pathname: "/shopManager/shopCategoryManager",
          }} style={{
            marginRight: 4
          }}>分类列表</Link>
          <Link className={styles.Linker} to={{
            pathname: "/shopManager/shopCategoryManager/shopTagManager",
          }} style={{
            marginRight: 4
          }}>标签管理</Link>
          <Link className={styles.Linker} to={{
            pathname: "/shopManager/shopCategoryManager/shopCategoryChoosen",
          }} style={{
            marginRight: 4
          }}>分类精选</Link>
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

export default connect(mapStateToProps)(categoryManager)

