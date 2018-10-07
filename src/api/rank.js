/**
 * Created by chang on 2018/9/29.
 */
import axios from 'axios'

export function getTopList () {
  const url = '/getTopList'
  const data = {
    g_tk: 5381,
    uin: 0,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    _: 1538151934378
  }
  return axios.get(url, {
    params: data
  })
}

export function getMusicList () {
  const url = `/getTopMusicList`
  const data = {
    g_tk: 5381,
    uin: 0,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    tpl: 3,
    page: 'detail',
    type: 'top',
    topid: 4,
    _: 1538542862190
  }
  return axios.get(url, {
    params: data
  })
}
