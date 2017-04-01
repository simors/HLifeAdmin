/**
 * Created by lilu on 2017/4/1.
 */
import AV from 'leancloud-storage'


export async function fetchPromoterList(payload){
  try{
    // console.log('===========+>hello=======+>')

    let promoterList = await AV.Cloud.run('promoterFetchPromoter',payload)

    // console.log('hello=======+>',commissionCof.config)
    return{
      success:true,promoterList:promoterList.promoters
    }
  }catch (err){
    return {success:false}
  }
}


export async function fetchAgentList(payload){
  try{
    // console.log('===========+>hello=======+>')

    let promoterList = await AV.Cloud.run('promoterGetAgent',payload)

    // console.log('hello=======+>',commissionCof.config)
    return{
      success:true,promoterList:promoterList.promoters
    }
  }catch (err){
    return {success:false}
  }
}