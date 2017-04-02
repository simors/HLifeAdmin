/**
 * Created by lilu on 2017/2/28.
 */
import AV from 'leancloud-storage'

export async function getShopCategoryList(payload) {
  try {
    let categoryList = await AV.Cloud.run('getShopCategoryList', payload)
    //console.log(categoryList)
    return {success: true, categoryList: categoryList}
  } catch (err) {
    return {success: false}
  }
}

export async function getShopTagList(payload) {
  try {
    let tagList = await AV.Cloud.run('getShopTagList', payload)
    // console.log('tagList=======>',tagList)
    return {success: true, tagList: tagList}
  } catch (err) {
    return {success: false}
  }
}

export async function createShopCategory(payload) {
  // console.log('asasasas', payload)
  let localFile = payload.imageSource.file.originFileObj
  let name = 'categorytestimage.png'
  let file = new AV.File(name, localFile)
  let a = await file.save()
  let localImage = payload.showPictureSource.file.originFileObj
  let imageName = 'categorytestimage.png'
  let image = new AV.File(imageName, localImage)
  let b = await image.save()
  let imageSource = a.attributes.url
  let showPictureSource = b.attributes.url
  let tagList = []
  payload.selectedTags.forEach((result)=> {
    let tag = {
      __type: 'Pointer',
      className: 'ShopTag',
      objectId: result.id
    }
    tagList.push(tag)
  })
  let categoryInfo = {
    text: payload.text,
    tagList: tagList,
    status: payload.status,
    imageSource: imageSource,
    showPictureSource: showPictureSource,
    describe: payload.describe,
    displaySort: payload.displaySort,
    textColor: payload.textColor
  }
  // console.log('categoryInfo', categoryInfo)

  try {
    await AV.Cloud.run('createShopCategory', categoryInfo)
    return {success: true}

  } catch (err) {
    return {success: false}
  }
}

export async function updateShopCategory(payload) {
   console.log('as',payload)
  let imageSource = ''
  let showPictureSource = ''
  if (payload.imageSource.file) {
    let localFile = payload.imageSource.file.originFileObj
    let name = 'categorytestimage.png'
    let file = new AV.File(name, localFile)
    let a = await file.save()
    imageSource = a.attributes.url
  } else {
    imageSource = payload.imageSource.url
    // console.log('hahahahahahhaahhahahaha=>>>>>>>>>>>>>')
  }
  if (payload.showPictureSource.file) {
    let localFile = payload.showPictureSource.file.originFileObj
    let name = 'categorytestimage.png'
    let file = new AV.File(name, localFile)
    let a = await file.save()
    showPictureSource = a.attributes.url
  } else {
    showPictureSource = payload.showPictureSource.url
    // console.log('hahahahahahhaahhahahaha=>>>>>>>>>>>>>')
  }

  let tagList = []
  if(payload.selectedTags){
    payload.selectedTags.forEach((result)=> {
      let tag = {
        __type: 'Pointer',
        className: 'ShopTag',
        objectId: result.id
      }
      tagList.push(tag)
    })
  }

  let categoryInfo = {
    id: payload.key,
    text: payload.text,
    tagList: tagList,
    status: payload.status,
    imageSource: imageSource,
    showPictureSource: showPictureSource,
    describe: payload.describe,
    displaySort: payload.displaySort,
    textColor: payload.textColor
  }
  // console.log('categoryInfo', categoryInfo)
  try {
    await AV.Cloud.run('updateShopCategory', categoryInfo)
    return {success: true}

  } catch (err) {
    return {success: false}
  }
}

export async function createShopTag(payload) {
  try {
    // console.log('payload===>',payload)
    await AV.Cloud.run('createShopTag', payload)
    return {success: true}
  } catch (err) {
    return {success: false}
  }
}

export async function updateShopTag(payload) {
  try {
    await AV.Cloud.run('updateShopTag', payload)
    return {success: true}
  } catch (err) {
    return {success: false}
  }
}

export async function updateChoosenCategory(payload) {
  try {
    await AV.Cloud.run('updateChoosenCategory', payload)
    return {success: true}

  } catch (err) {
    return {success: false}
  }
}

export async function updateCategoryStatus(payload) {
  try {
    await AV.Cloud.run('updateCategoryStatus', payload)
    return {success: true}
  } catch (err) {
    return {success: false}
  }
}