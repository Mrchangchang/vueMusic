/**
 * Created by chang on 2018/10/11.
 */
import axios from 'axios'

export function getHotKey () {
  const url = '/getHotKey'
  const data = {
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
  }
  return axios.get(url, {
    params: data
  })
}

export function search (query, page, zhida, perpage) {
  const url = '/search'
  const data = {
    g_tk: 5381,
    uin: 0,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    w: query,
    zhidaqu: zhida ? 1 : 0,
    catZhida: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage,
    n: 20,
    p: page,
    remoteplace: 'txt.mqq.all',
    _: 1539273989217
  }
  return axios.get(url, {
    params: data
  })
}
