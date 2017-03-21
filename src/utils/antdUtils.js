/**
 * Created by zachary on 2017/3/21.
 */

//131:北京市; 132: 重庆市; 289: 上海市; 332:天津市; 2911:澳门; 2912:香港; 9000:台湾
export const SPECIAL_CITY_ARR = ['2911', '2912', '332', '289', '132', '131']

export function getNewTreeData(treeData, curKey, child, level) {
  const loop = (data, lev) => {
    const l = lev - 1;
    data.forEach((item) => {
      if (curKey == item.key) {
        let _child = child
        if(l < 1 || SPECIAL_CITY_ARR.includes(curKey)) {
          _child = child.map((itemData, index)=>{
            return {
              ...itemData,
              isLeaf: true
            }
          })
        }
        item.children = _child;
      }else {
        if (item.children && item.children.length) {
          loop(item.children, l);
        }
      }
    });
  };
  loop(treeData, level);
}
