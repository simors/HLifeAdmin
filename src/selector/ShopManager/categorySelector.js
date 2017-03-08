/**
 * Created by lilu on 2017/2/28.
 */
export function getCategoryList(state) {
  return state.shopCategoryManager.categoryList
}

export function getTagList(state) {
  return state.shopCategoryManager.tagList
}

export function getCategoryPool(state) {
  return state.shopCategoryManager.categoryPool
}

export function getCategoryChoosenPool(state) {
  return state.shopCategoryManager.categoryChoosenPool
}