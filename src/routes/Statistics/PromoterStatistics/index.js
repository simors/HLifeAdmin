/**
 * Created by lilu on 2017/4/22.
 */
import React, {Component} from 'react'
import { DatePicker } from 'antd';

export default class PromoterStatistics extends Component{
  constructor(props){
    super(props)
  }
  onChange(date, dateString) {
    console.log(date, dateString);
  }
  render(){
    return(
      <div>
      <div><DatePicker onChange={this.onChange}></DatePicker></div>
      {/*<div>hahhaha</div>*/}
        </div>
    )
  }
}

