/**
 * Created by lilu on 2017/4/22.
 */
import AV from 'leancloud-storage'
export async function getPromoterStatistics(payload){
  let statistics = await AV.Cloud.run('statPromoterPerformance',payload.date)
}