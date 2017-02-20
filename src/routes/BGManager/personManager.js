/**
 * Created by lilu on 2017/2/18.
 */
import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import UserList from '../../components/BKManager/personManager/personList'
import {getPersonList} from '../../selector/BGManager/personManager'
// import UserSearch from '../../components/users/search'
// import UserModal from '../../components/users/modal'

function personManager({location,dispath,personList}) {
  const userListProps = {
    dataSource: personList
  }
return (
  <div className='content-inner'>

    <UserList {...userListProps} />

  </div>)
}


function mapStateToProps(state) {
  let personList = getPersonList(state)
  console.log('personList===>',personList)
  return {personList:personList}
}

export default connect(mapStateToProps)(personManager)