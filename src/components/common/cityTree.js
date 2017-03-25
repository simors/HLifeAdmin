/**
 * Created by lilu on 2017/3/22.
 */
import {Select,Tree} from 'antd'
import {connect} from 'dva'
import React, {Component} from 'react'
import {getProvinceList} from '../../selector/ActionManager/actionListManager'
import {getCitysByBaiduMap,getDistrictByBaiduMap} from '../../services/baiduMap'
import {getCityList,getDistrictList,getProviceList} from './baiduMap'
const Option = Select.Option;


class CityTree extends Component{
  constructor(props){
    super(props)
    this.state={treeData: [],}
  }
  render() {
    const loop = data => data.map((item) => {
      if (item.children) {
        return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;
      }
      return <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf} disabled={item.key === '0-0-0'} />;
    });
    const treeNodes = loop(this.state.treeData);
    return (
      <Tree onSelect={this.onSelect} loadData={this.onLoadData}>
        {treeNodes}
      </Tree>
    );
  }
}
