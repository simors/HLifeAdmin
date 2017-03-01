/**
 * Created by lilu on 2017/2/28.
 */
import AV from 'leancloud-storage'

export async function getShopCategoryList() {
  try{
    let categoryList = await AV.Cloud.run('getShopCategoryList')
    console.log(categoryList)
    return {success:true,categoryList:categoryList}
  }catch (err){
    return {success:false}
  }
}