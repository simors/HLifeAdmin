/**
 * Created by lilu on 2017/3/30.
 */
import AV from 'leancloud-storage'


export async function fetchCommissionCof(){
  try{
    console.log('===========+>hello=======+>')

    let commissionCof = await AV.Cloud.run('promoterGetSysConfig')

    console.log('hello=======+>',commissionCof.config)
    return{
      success:true,commissionCof:commissionCof.config
    }
  }catch (err){
    return {success:false}
  }
}