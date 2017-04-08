/**
 * Created by lilu on 2017/4/2.
 */
/**
 * Created by lilu on 2017/3/10.
 */
import React, {Component} from 'react'
import {getPromoterDetail} from '../../selector/PromoterManager/promoterAgentSelector'
import {connect} from 'dva'
// import AppUserManager from './AppUserManager'
import {Tag, Tabs} from 'antd'
import AppUserDetail from '../../components/BGManager/appUserManager/appUserDetail'
// import UserShopDetail from'./UserShopDetail'
import * as CommonSelect from '../../selector/CommonSelect'
import PromoterAgentManager from './PromoterAgentManager'

const TabPane = Tabs.TabPane

class PromoterDetail extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    this.props.dispatch({
      type: 'promoterAgentSet/fetchPromoterDetail',
      payload: {promoterId: this.props.location.query.id}
    })
    this.props.dispatch({
      type: 'common/fetchSubAreaList'
    })

  }

  // user2promoter(data){
  //   this.props.dispatch({
  //     type:'appUserManager/userToPromoter',
  //     payload:{
  //       ...data,
  //       userId:this.props.appUserDetail.id
  //     }
  //   })
  // }
  // updateUserEnable(payload, record) {
  //   // console.log('payload,record',payload,record)
  //   this.props.dispatch({type: 'appUserManager/updateAppUserEnable', payload: {id: record, status: payload ? 1 : 0}})
  //
  // }
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
  renderUpUser() {
    if (this.props.promoterDetail.upUser.id) {
      return <TabPane tab='上级用户详情' key='2'>
        <AppUserDetail areaTreeSelectData={this.props.areaTreeSelectData} userDetail={this.props.promoterDetail.upUser}
                       updateUserEnable={(payload, record)=> {
                         this.updateUserEnable(payload, record)
                       }} user2promoter={(data)=> {
          this.user2promoter(data)
        }}/>

      </TabPane>
    } else {
      return null
    }

  }

  render() {
    return (
      <PromoterAgentManager>
        <Tabs defaultActiveKey='1' className='content-inner'>
          <TabPane tab='用户详情' key='1'>
            <AppUserDetail areaTreeSelectData={this.props.areaTreeSelectData}
                           userDetail={this.props.promoterDetail.user}
                           updateUserEnable={(payload, record)=> {
                             this.updateUserEnable(payload, record)
                           }} user2promoter={(data)=> {
              this.user2promoter(data)
            }}/>

          </TabPane>
          {this.renderUpUser()}

        </Tabs>
      </PromoterAgentManager>
    )
  }
}

function mapStateToProps(state, ownProps) {
// console.log('aaaaa',ownProps.location.query)
  let promoterDetail = getPromoterDetail(state, ownProps.location.query.id)
  const areaTreeSelectData = CommonSelect.selectAreaTreeSelectData(state)
  console.log('appUserDetail', promoterDetail)
  return {promoterDetail: promoterDetail, areaTreeSelectData: areaTreeSelectData}
}

export default connect(mapStateToProps)(PromoterDetail)
