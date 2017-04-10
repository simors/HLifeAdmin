/**
 * Created by wanpeng on 2017/4/10.
 */
import AV from 'leancloud-storage'

export async function fetchShopTenantFee(payload) {
  try {
    console.log("fetchShopTenantFee payload", payload)


    let shopTenantFeeList = await AV.Cloud.run('promoterGetShopTenantFeeList', payload)
    console.log("fetchShopTenantFee shopTenantFeeList:", shopTenantFeeList)
    return {
      success: true,
      shopTenantFeeList: shopTenantFeeList
    }

  }catch (error) {
    console.log("fetchShopTenantFee error:", error)
    return {success:false}
  }
}

export async function getShopTenantByCity() {
  try {

  }catch (error) {
    return {success:false}
  }
}

export async function setShopTenantFee() {
  try {

  }catch (error) {
    return {success:false}
  }
}
