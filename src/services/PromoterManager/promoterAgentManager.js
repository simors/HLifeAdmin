/**
 * Created by lilu on 2017/4/1.
 */
import AV from 'leancloud-storage'


export async function fetchPromoterList(){
  try{
    // console.log('===========+>hello=======+>')

    let promoterList = await AV.Cloud.run('promoterFetchPromoter')

    // console.log('hello=======+>',commissionCof.config)
    return{
      success:true,promoterList:promoterList.promoters
    }
  }catch (err){
    return {success:false}
  }
}