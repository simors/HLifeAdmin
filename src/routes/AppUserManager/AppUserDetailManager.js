/**
 * Created by lilu on 2017/3/10.
 */
import React, {Component} from 'react'
import {getAppUserDetail, getPromoterDetail} from '../../selector/BGManager/appUserManagerSelector'
import {connect} from 'dva'
import AppUserManager from './AppUserManager'
import PromoterDetail from '../../components/PromoterManager/PromoterAgent/promoterDetail'
import {Tag, Tabs} from 'antd'
import AppUserDetail from '../../components/BGManager/appUserManager/appUserDetail'
import UserShopDetail from'./UserShopDetail'
import * as CommonSelect from '../../selector/CommonSelect'
const TabPane = Tabs.TabPane

class appUserDetailManager extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    // console.log('id================?',this.props.location.query.id)
    this.props.dispatch({
      type: 'appUserManager/fetchUserDetailById',
      payload: {userId: this.props.location.query.id}
    })
    if (this.props.appUserDetail.identity && this.props.appUserDetail.identity.length > 0) {
      if (this.props.appUserDetail.identity[0] == 'promoter' || this.props.appUserDetail.identity[1] == 'promoter') {
        console.log('this.props.appUserDetail.identity', this.props.appUserDetail.identity)
        this.props.dispatch({
          type: 'appUserManager/fetchPromoterDetailByUserId',
          payload: {userId: this.props.location.query.id}
        })
      }
      if (this.props.appUserDetail.identity[0] == 'shopKeeper' || this.props.appUserDetail.identity[1] == 'shopKeeper') {

        this.props.dispatch({
          type: 'appUserManager/fetchShopDetailByUserId',
          payload: {id: this.props.location.query.id}
        })
      }
    }
  }

  user2promoter(data) {
    this.props.dispatch({
      type: 'appUserManager/userToPromoter',
      payload: {
        ...data,
        userId: this.props.appUserDetail.id
      }
    })
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
  promoter2Agent(data) {
    // console.log('data=====>',data)
    this.props.dispatch({
      type: 'promoterAgentSet/agentAdd', payload: {
        ...data, promoterId: this.props.promoterDetail.promoter.objectId, success: ()=> {
          this.props.dispatch({
            type: 'appUserManager/fetchPromoterDetailByUserId',
            payload: {userId: this.props.location.query.id}
          })
          this.props.dispatch({
            type: 'appUserManager/fetchShopDetailByUserId',
            payload: {id: this.props.location.query.id}
          })
        }
      }
    })

  }

  renderTab() {
    if (this.props.appUserDetail.identity && this.props.appUserDetail.identity.length > 0) {
      let panes = this.props.appUserDetail.identity.map((item, key)=> {
        // console.log('item',item)

        if (item == 'promoter') {
          console.log('here is code')
          return <TabPane tab='推广详情' key='2'><PromoterDetail promoterDetail={this.props.promoterDetail.promoter}
                                                             areaTreeSelectData={this.props.areaTreeSelectData}
                                                             promoter2Agent={(data)=> {
                                                               this.promoter2Agent(data)
                                                             }}/></TabPane>
        } else if (item == 'shopkeeper') {
          // console.log('this.props.appUserDetail.identity',this.props.appUserDetail.identity)
          return <TabPane tab='店铺详情' key='3'><UserShopDetail
            userDetail={this.props.appUserDetail}></UserShopDetail></TabPane>
        }
      })
      return panes
    } else {
      return null
    }
  }

  render() {
    return (
      <AppUserManager>

        <Tabs defaultActiveKey='1' className='content-inner'>
          <TabPane tab='用户详情' key='1'><AppUserDetail areaTreeSelectData={this.props.areaTreeSelectData}
                                                     userDetail={this.props.appUserDetail}
                                                     updateUserEnable={(payload, record)=> {
                                                       this.updateUserEnable(payload, record)
                                                     }} user2promoter={(data)=> {
            this.user2promoter(data)
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
  const areaTreeSelectData = CommonSelect.selectAreaTreeSelectData(state)
  let promoterDetail = getPromoterDetail(state, ownProps.location.query.id)
  // console.log('areaTreeSelectData',areaTreeSelectData)
  return {appUserDetail: appUserDetail, areaTreeSelectData: areaTreeSelectData, promoterDetail: promoterDetail}
}

export default connect(mapStateToProps)(appUserDetailManager)
