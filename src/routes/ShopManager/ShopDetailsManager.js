/**
 * Created by lilu on 2017/3/10.
 */
import React, {Component} from 'react'
import {getShopList} from '../../selector/ShopManager/shopSelector'
import {connect} from 'dva'
import ShopInfoManager from './ShopInfoManager'

class ShopDetailsManager extends Component{
  constructor(props){
    super(props)

  }
  componentDidMount(){
console.log('payload',...this.props)
  }
  render(){
    return(
      <ShopInfoManager>
        <div className='content-inner'>hhhh</div>
        </ShopInfoManager>
    )
  }
}

function mapStateToProps(state) {
 return {}
}

export default connect(mapStateToProps)(ShopDetailsManager)
