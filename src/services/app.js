import { request } from '../utils'
import AV from 'leancloud-storage'

export function getPivilege (params){

}



export async function login (params) {
  return request('/api/login', {
    method: 'post',
    data: params
  })
}

export async function logout (params) {
  return request('/api/logout', {
    method: 'post',
    data: params
  })
}

export async function userInfo (params) {
  return request('/api/userInfo', {
    method: 'get',
    data: params
  })
}
