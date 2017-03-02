/**
 * Created by lilu on 2017/2/28.
 */
import AV from 'leancloud-storage'

export async function getShopCategoryList() {
  try{
    let categoryList = await AV.Cloud.run('getShopCategoryList')
    //console.log(categoryList)
    return {success:true,categoryList:categoryList}
  }catch (err){
    return {success:false}
  }
}

export async function getShopTagList(){
  try{
    let tagList = await AV.Cloud.run('getShopTagList')
   // console.log('tagList',tagList)
    return {success:true,tagList:tagList}
  }catch (err){
    return{success:false}
  }
}

export async function createShopCategory(payload){
  console.log('asasasas',payload.imageSource.file.originFileObj)
  let localFile = payload.imageSource.file.originFileObj
  let name = 'categorytestimage.png'
  let file = new AV.File(name,localFile)
  let a = await file.save()
  console.log('a',a)
    let imageSource=a.attributes.url
    let categoryInfo = {
      text:payload.text,
      tagList:payload.selectedTags,
      status:payload.status,
      imageSource:imageSource
    }
    console.log('categoryInfo',categoryInfo)

    return{success:true}




}