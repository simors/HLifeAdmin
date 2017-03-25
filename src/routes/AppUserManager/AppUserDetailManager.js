/**
 * Created by lilu on 2017/3/10.
 */
import React, {Component} from 'react'
import {getAppUserDetail} from '../../selector/BGManager/appUserManagerSelector'
import {connect} from 'dva'
import AppUserManager from './AppUserManager'
import {Tag, Tabs} from 'antd'
import AppUserDetail from '../../components/BGManager/appUserManager/appUserDetail'

const TabPane = Tabs.TabPane

class appUserDetailManager extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {


  }


  updateUserEnable(payload, record) {
    // console.log('payload,record',payload,record)
    this.props.dispatch({type: 'appUserManager/updateAppUserEnable', payload: {id: record, status: payload ? 1 : 0}})

  }
  // renderShopTab(){
  //   // console.log('this.props.appUserDetail.identity',this.props.appUserDetail.identity)
  //   if(this.props.appUserDetail.identity&&this.props.appUserDetail.identity.length>0){
  //     this.props.appUserDetail.identity.forEach((item)=>{
  //       // console.log('item',item)
  //       if(item=='shopkeeper'){
  //         return <TabPane tab='店铺详情' key='2'></TabPane>
  //
  //       }else{
  //         return null
  //       }
  //     })
  //   }else {
  //     return null
  //   }
  // }
  renderTab(){
    if(this.props.appUserDetail.identity&&this.props.appUserDetail.identity.length>0){
      let panes=this.props.appUserDetail.identity.map((item,key)=>{
        // console.log('item',item)

        if(item=='promoter'){
          // console.log('here is code')
          return <TabPane tab='推广详情' key='2'></TabPane>
        }else if(item=='shopkeeper'){
          return <TabPane tab='店铺详情' key='3'></TabPane>
        }
      })
      return panes
    }else {
      return null
    }
  }

  render() {
    return (
      <AppUserManager>

        <Tabs defaultActiveKey='1' className='content-inner'>
          <TabPane tab='用户详情' key='1'><AppUserDetail userDetail={this.props.appUserDetail}
                                                     updateUserEnable={(payload, record)=> {
                                                       this.updateUserEnable(payload, record)
                                                     }}/>

          </TabPane>
          {this.renderTab()}
          {/*{this.renderPromotorTab()}*/}

        </Tabs>

      </AppUserManager>
    )
  }
}

function mapStateToProps(state, ownProps) {
// console.log('aaaaa',ownProps.location.query)
  let appUserDetail = getAppUserDetail(state, ownProps.location.query.id)

   console.log('appUserDetail',appUserDetail)
  return {appUserDetail: appUserDetail}
}

export default connect(mapStateToProps)(appUserDetailManager)
