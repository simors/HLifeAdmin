/**
 * Created by lilu on 2017/5/20.
 */
/**
 * Created by lilu on 2017/5/16.
 */
import React, {Component, PropTypes} from 'react'
import {hashHistory} from 'dva/router'
import {connect} from 'dva'
import {Row, Col, Button, Icon,message} from 'antd'
import CategoryPool from '../../components/ShopManager/CategoryManager/CagegoryPool'
import CategoryChoosenPool from '../../components/ShopManager/CategoryManager/CategoryChoosenPool'
import Card from '../../components/common/card'
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';
import update from 'react/lib/update';

@DragDropContext(HTML5Backend)

class TopicCategorySort extends Component{
  constructor(props){
    super(props)
    this.moveCard = this.moveCard.bind(this);
    this.state = {
      selectCategory: {},
      categoryList: [],
      categoryPool: this.props.categoryList,
      count: this.props.categoryList.length
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
    // let choosenCategoryList=[]
    // this.props.categoryList.forEach((item)=>{
    //   if(item!=undefined&&item.displaySort&&item.displaySort!=0&&item.displaySort!=null){
    //     // console.log('+++=item',item)
    //     choosenCategoryList[item.displaySort-1]=item
    //   }
    // })
    // console.log('choosenCategoryList',choosenCategoryList)

    this.setState({
      categoryList:this.props.categoryList
    })
  }
  cancelChoosen(payload) {
    let choosenCategroyList = this.state.categoryList
    choosenCategroyList.splice(payload, 1)
    this.setState({
      categoryList: choosenCategroyList
    })
  }

  moveCard(dragIndex, hoverIndex) {
    const {categoryList} = this.state;
    const dragCard = categoryList[dragIndex];

    this.setState(update(this.state, {
      categoryList: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      },
    }));
    // console.log('choosenCategory', this.state.choosenCategory)
  }
  submitCategory() {
    // console.log('submit',this.state.choosenCategory)
    this.props.dispatch({
      type: 'topicCategoryManage/submitTopicCategorySort',
      payload: {
        categoryList: this.state.categoryList,
        success: ()=>{
          message.success('提交成功')
        }
      }
    })
    // hashHistory.pushState(null, '/shopManager/shopCategoryManager')
  }
  render() {
    const { categoryList} = this.state;
    return (
        <div style={{flex:1}}>
          <Row type='flex' justify='center' align='middle'>


            <Col span={10}>
              <div style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
                <Button size='large' type="primary" onClick={()=> {
                  this.submitCategory()
                }}>提交分类排序</Button></div>
              <div style={{flex: 1, borderWidth: 1, borderColor: '#FFFFFF', backgroundColor: '#FFFFFF',alignItem:'center'}}>
                <h1 style={{ fontSize: 14,marginBottom:10,flex:1,flexDirection:'row',justifyContent:'center',backgroundColor:'#CCCCCC'}}>分类排序</h1>
                {categoryList.map((card, i) => (
                  <Card
                    key={card.id}
                    index={i}
                    id={card.id}
                    text={card.title}
                    moveCard={this.moveCard}
                    cancelEnable = {false}
                    cancelChoosen={(payload)=> {
                      this.cancelChoosen(payload)
                    }}
                  />
                ))}
              </div>
            </Col>
          </Row>
          <Row>

          </Row>
        </div>
    )
  }

}

function mapStateToProps(state) {
  // let categoryList = getCategoryList(state)
  //
  // return {
  //   categoryList: categoryList,
  //
  // }
  return {}
}

export default connect(mapStateToProps)(TopicCategorySort)
