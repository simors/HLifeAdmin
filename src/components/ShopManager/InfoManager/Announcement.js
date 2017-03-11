/**
 * Created by lilu on 2017/3/11.
 */
import React,{Component} from 'react'
import {Table, Popconfirm,Card} from 'antd'
import {TweenOneGroup} from 'rc-tween-one'
import styles from './ShopList.less'
import {Link} from 'dva/router'


export default class announcement extends Component{
  constructor(props){
    super(props)
  }

  render(){
    // console.log('asas',{...this.props})
    return(
      <Card  title={this.props.index==0?'当前通告':'历史通告'}>
        <div>
          <img style={{width:50,height:50}}  src={this.props.coverUrl}/>
        </div>
        <p>{this.props.content}</p>
      </Card>
    )
  }
}