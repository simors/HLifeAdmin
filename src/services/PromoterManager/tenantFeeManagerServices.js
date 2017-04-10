/**
 * Created by wanpeng on 2017/4/10.
 */
import AV from 'leancloud-storage'

export async function fetchShopTenantFee(payload) {
  try {
    console.log("fetchShopTenantFee payload", payload)


    let result = await AV.Cloud.run('promoterGetShopTenantFeeList', payload)
    console.log("promoterGetShopTenantFeeList result", result)
    if(result.errcode == 0) {
      return {
        success: true,
        shopTenantFeeList: result.tenantFee
      }
    } else {
      return {
        success: false,
        message: result.message,
      }
    }

  }catch (error) {
    console.log("fetchShopTenantFee error:", error)
    return {success:false}
  }
}

export async function setShopTenantFee(payload) {
  try {
    console.log("setShopTenantFee payload", payload)
    let result = await AV.Cloud.run('promoterSetShopTenant', payload)
    console.log("promoterSetShopTenant return:", result)
    if(result.errcode == 0) {
      return {
        success: true,
        shopTenantFee: result.tenant
      }
    } else {
      return {
        success: false,
        message: result.message,
      }
    }


  }catch (error) {
    return {success:false}
  }
}
