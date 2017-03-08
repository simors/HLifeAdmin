/**
 * Created by lilu on 2017/3/7.
 */
import React, {Component, PropTypes} from 'react'
import CategoryManager from './CategoryManager'
import {connect} from 'dva'
import {Row,Col,Button,Icon} from 'antd'
import CategoryPool from '../../components/ShopManager/CategoryManager/CagegoryPool'
import CategoryChoosenPool from '../../components/ShopManager/CategoryManager/CategoryChoosenPool'

import {getCategoryList,getTagList,getCategoryChoosenPool,getCategoryPool} from '../../selector/ShopManager/categorySelector'

class CategoryChoosen extends Component {
  constructor(props){
    super(props)
    this.state={
      selectCategory:{},
      choosenCategory:[],
      categoryPool:this.props.categoryList
    }
  }

  componentDidMount(){
    // this.props.dispatch({
    //   type:'shopCategoryManager/fecthCatagoryPool',
    //   payload:{
    //     categoryPool:this.props.categoryList,
    //     categoryChoosenPool:this.state.choosenCategory
    //   }
    // })
  }

  selectCatgory(data){
    // console.log('data',data)

    this.setState({
      selectCategory:data.selectCategory[0]
    })
    // console.log('state',this.state.selectCategory)

  }
  chooseCategory(){
    let categoryList = this.state.choosenCategory
    categoryList.push(this.state.selectCategory)
    this.setState({
      choosenCategory:categoryList
    })

    // console.log('this.state.choosen',this.state.choosenCategory)
    // this.props.dispatch({
    //   type:'shopCategoryManager/fecthCatagoryPool',
    //   payload:{
    //     categoryPool:this.props.categoryPool,
    //     categoryChoosenPool:this.state.choosenCategory
    //   }
    // })
  }
  render(){
    return(
      <CategoryManager>
        <div>
          <Row type='flex' justify='center' align='middle'  >
            <Col  span={10}>
             <div> <CategoryPool dataSource={this.state.categoryPool} selectCategory={(payload)=>{this.selectCatgory(payload)}}/></div>
            </Col>
            <Col  span={4}>
              <div style={{marginLeft:10}}>
              <Button onClick={()=>{this.chooseCategory()}}> <Icon type="right"></Icon></Button>
              <Button style={{marginTop:20}}> <Icon type="left"></Icon></Button>
                </div>
            </Col>
            <Col  span={10}>
              <CategoryChoosenPool dataSource={this.state.choosenCategory}/>
            </Col>
          </Row>
        </div>
      </CategoryManager>
    )
  }
}

function mapStateToProps(state) {
  let categoryList = getCategoryList(state)

  return {
    categoryList:categoryList,

  }}

export default connect(mapStateToProps)(CategoryChoosen)
