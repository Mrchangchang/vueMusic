/**
 * Created by chang on 2018/9/9.
 */
import {commonParams, options} from './config'
import jsonp from './../common/js/jsonp'
import axios from 'axios'

export function getSongKey (id) {
  const url = '/getSongKey'
  const data = {
    g_tk: 5381,
    // jsonpCallback: 'MusicJsonCallback12270284645757412',
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    cid: 205361747,
    // callback: 'MusicJsonCallback12270284645757412',
    uin: 0,
    songmid: id,
    filename: `C400${id}.m4a`,
    guid: 6567709520
  }
  return axios.get(url, {
    params: data
  })
}
