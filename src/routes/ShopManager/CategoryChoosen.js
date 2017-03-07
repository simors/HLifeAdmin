/**
 * Created by lilu on 2017/3/7.
 */
import React, {Component, PropTypes} from 'react'
import CategoryManager from './CategoryManager'
import {connect} from 'dva'

class CategoryChoosen extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
      <CategoryManager>
        <div></div>
      </CategoryManager>
    )
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(CategoryChoosen)
