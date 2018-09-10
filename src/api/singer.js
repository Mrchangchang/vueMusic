/**
 * Created by chang on 2018/6/24.
 */
import {commonParams, options} from './config'
import jsonp from './../common/js/jsonp'
import axios from 'axios'

export function getSingerList (index) {
  const url = 'getDiscList'
  const params = {
    'comm': {'ct': 24, 'cv': 10000},
    'singerList': {
      'module': 'Music.SingerListServer',
      'method': 'get_singer_list',
      'param': {'area': -100, 'sex': -100, 'genre': -100, 'index': index, 'sin': 0, 'cur_page': 1}
    }
  }
  const data = Object.assign({}, commonParams, {
    jsonpCallback: '__jp1',
    channel: 'singer',
    pagesize: 10,
    pagenum: 1,
    page: 'List',
    hostUin: 0,
    needNewCode: 0,
    platForm: 'yqq',
    g_tk: 5381,
    data: params
  })
  return axios.get(url, {
    params: data
  })
}

export function getSingerDetail (id) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const data = Object.assign({}, commonParams, {
    g_tk: 1185215279,
    hostUin: 0,
    format: 'jsonp',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    singermid: id,
    order: 'listen',
    begin: 0,
    num: 30,
    songstatus: 1
  })
  return jsonp(url, data, options)
}
