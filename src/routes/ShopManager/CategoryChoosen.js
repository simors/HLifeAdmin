/**
 * Created by lilu on 2017/3/7.
 */
import React, {Component, PropTypes} from 'react'
import CategoryManager from './CategoryManager'
import {hashHistory} from 'dva/router'
import {connect} from 'dva'
import {Row, Col, Button, Icon} from 'antd'
import CategoryPool from '../../components/ShopManager/CategoryManager/CagegoryPool'
import CategoryChoosenPool from '../../components/ShopManager/CategoryManager/CategoryChoosenPool'
import Card from '../../components/common/card'
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';
import update from 'react/lib/update';

import {
  getCategoryList,
  getTagList,
  getCategoryChoosenPool,
  getCategoryPool
} from '../../selector/ShopManager/categorySelector'
@DragDropContext(HTML5Backend)
class CategoryChoosen extends Component {
  constructor(props) {
    super(props)
    this.moveCard = this.moveCard.bind(this);
    this.state = {
      selectCategory: {},
      choosenCategory: [],
      categoryPool: this.props.categoryList,
      count: 6
    }
  }

  componentDidMount() {
    // this.props.dispatch({
    //   type:'shopCategoryManager/fecthCatagoryPool',
    //   payload:{
    //     categoryPool:this.props.categoryList,
    //     categoryChoosenPool:this.state.choosenCategory
    //   }
    // })
  }

  cancelChoosen(payload) {
    let choosenCategroyList = this.state.choosenCategory
    choosenCategroyList.splice(payload, 1)
    this.setState({
      choosenCategory: choosenCategroyList
    })
  }

  moveCard(dragIndex, hoverIndex) {
    const {choosenCategory} = this.state;
    const dragCard = choosenCategory[dragIndex];

    this.setState(update(this.state, {
      choosenCategory: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      },
    }));
    console.log('choosenCategory', this.state.choosenCategory)
  }

  selectCatgory(data) {
    // console.log('data',data)

    this.setState({
      selectCategory: data.selectCategory[0]
    })
    // console.log('state',this.state.selectCategory)

  }

  chooseCategory() {
    let categoryList = this.state.choosenCategory
    categoryList.push(this.state.selectCategory)
    this.setState({
      choosenCategory: categoryList
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

  submitCategory() {
    // console.log('submit',this.state.choosenCategory)
    this.props.dispatch({
      type: 'shopCategoryManager/submitChoosenCategory',
      payload: {
        choosenCategory: this.state.choosenCategory
      }
    })
    hashHistory.pushState(null, '/shopManager/shopCategoryManager')
  }

  render() {
    const {choosenCategory} = this.state;
    return (
      <CategoryManager>
        <div>
          <Row type='flex' justify='center' align='middle'>
            <Col span={10}>
              <div><CategoryPool dataSource={this.state.categoryPool} selectCategory={(payload)=> {
                this.selectCatgory(payload)
              }}/></div>
            </Col>
            <Col span={4}>
              <div style={{marginLeft: 10}}>
                {this.state.choosenCategory.length < this.state.count ? <Button onClick={()=> {
                  this.chooseCategory()
                }}> <Icon type="right"></Icon></Button> : null}

              </div>
            </Col>
            <Col span={10}>
              <div style={{flex: 1, height: 350, borderWidth: 1, borderColor: '#FFFFFF', backgroundColor: '#FFFFFF'}}>
                <div style={{left: 50, fontSize: 14}}>精选分类</div>
                {choosenCategory.map((card, i) => (
                  <Card
                    key={card.id}
                    index={i}
                    id={card.id}
                    text={card.text}
                    moveCard={this.moveCard}
                    cancelChoosen={(payload)=> {
                      this.cancelChoosen(payload)
                    }}
                  />
                ))}
              </div>
            </Col>
          </Row>
          <Row>
            <Button onClick={()=> {
              this.submitCategory()
            }}>提交精选分类</Button>
          </Row>
        </div>
      </CategoryManager>
    )
  }
}

function mapStateToProps(state) {
  let categoryList = getCategoryList(state)

  return {
    categoryList: categoryList,

  }
}

export default connect(mapStateToProps)(CategoryChoosen)
