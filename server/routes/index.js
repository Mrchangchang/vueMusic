var express = require('express')
var router = express.Router()
var axios = require('axios')

/* GET home page. */
router.get('/getDiscList', function (req, res, next) {
  'use strict'
  var url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  axios.get(url, {
    header: {
      referer: 'https://y.qq.com/',
      host: 'y.qq.com',
      ':authority': 'u.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((response) => {
    console.log(response)
  })
})

router.get('/getSongKey', (req, res, next) => {
  'use strict'
  let url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
  axios.get(url, {
    header: {
      referer: 'https://y.qq.com/portal/player.html',
      ':authority': 'u.y.qq.com',
      cookie: `pgv_pvid=6567709520; pgv_pvi=6197861376; ts_uid=6404021460; tvfe_boss_uuid=676e7fd0f420ee67; RK=wKnjWS67Of; ptcz=f6d3f5dc46522741a8331b2c60682711d695027c60d282b3093357d3ddbb78ca; o_cookie=78172670; pac_uid=1_78172670; ts_refer=ADTAGnewyqq.singer; pt2gguin=o0078172670; pgv_info=ssid=s4991250960; pgv_si=s765181952; qqmusic_fromtag=66; yqq_stat=0; ts_last=y.qq.com/n/yqq/singer/002J4UUk29y8BY.html; yq_playschange=0; yq_playdata=; player_exist=1; yplayer_open=1; yq_index=0
referer: https://y.qq.com/portal/player.html`
    },
    params: req.query
  }).then((response) => {
    res.send(response.data)
  }).catch(response => {
    console.log(response.data)
    res.send(response)
  })
})

router.get('/getSongLyric', (req, res, next) => {
  'use strict'
  let url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
  console.log('请求')
  axios.get(url, {
    headers: {
      referer: 'https://y.qq.com/portal/player.html',
      'authority': 'c.y.qq.com',
      cookie: `pgv_pvid=6567709520; pgv_pvi=6197861376; ts_uid=6404021460; tvfe_boss_uuid=676e7fd0f420ee67; RK=wKnjWS67Of; ptcz=f6d3f5dc46522741a8331b2c60682711d695027c60d282b3093357d3ddbb78ca; o_cookie=78172670; pac_uid=1_78172670; ts_refer=ADTAGnewyqq.singer; pt2gguin=o0078172670; pgv_info=ssid=s8775988352; pgv_si=s1575884800; yqq_stat=0; yq_playschange=0; yq_playdata=; player_exist=1; qqmusic_fromtag=66; yplayer_open=1; yq_index=3`,
      // ':path': `/lyric/fcgi-bin/fcg_query_lyric_new.fcg?callback=MusicJsonCallback_lrc&pcachetime=1537372106179&songmid=${req.query.songmid}&g_tk=5381&jsonpCallback=MusicJsonCallback_lrc&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0`,
      'scheme': 'https',
      'host': 'y.qq.com'
    },
    params: req.query
  }).then(response => {
    let reg = /^\w+\(({[^()]+})\)$/
    let data = response.data.match(reg)
    if (data[1]) {
      data = JSON.parse(data[1])
      res.json(data)
    }
  }).catch(response => {
    'use strict'
    console.log(response, '请求', response, 'response')
    res.send(response)
  })
})

router.get('/getSongList', (req, res, next) => {
  'use strict'
  let url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  axios.get(url, {
    headers: {
      referer: `https://y.qq.com/n/yqq/playlist/${req.query.disstid}.html`,
      'host': 'y.qq.com'
    },
    params: req.query
  }).then(response => {
    // let reg = /^\w+\(({[^()]+})\)$/
    // let data = response.data.match(reg)
    console.log(response.data)
    // if (data && data[1]) {
    //   data = JSON.parse(data[1])
    //   res.json(data)
    // }
    res.json(response.data)
  }).catch(response => {
    'use strict'
    console.log(response, '请求', response, 'response')
    res.send(response)
  })
})

router.get('/getTopList', (req, res, next) => {
  'use strict'
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://y.qq.com/m/index.html',
      origin: 'https://y.qq.com'
    },
    params: req.query
  }).then(response => {
    res.json(response.data)
  }).catch((response) => {
    res.json(response.data)
  })
})

router.get('/getTopMusicList', (req, res, next) => {
  'use strict'
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://y.qq.com/w/toplist.html?ADTAG=myqq&from=myqq&channel=10007100&id=4&type=top',
      origin: 'https://y.qq.com'
    },
    params: req.query
  }).then(response => {
    res.json(response.data)
  }).catch((response) => {
    res.json(response.data)
  })
})

router.get('/getHotKey', (req, res) => {
  'use strict'
  let url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://y.qq.com/portal/search.html',
      origin: 'http://evil.com/'
    },
    params: req.query
  }).then(response => {
    res.json(response.data)
  }).catch((response) => {
    res.json(response.data)
  })
})
router.get('/search', (req, res) => {
  'use strict'
  let url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
  axios.get(url, {
    headers: {
      referer: 'https://y.qq.com/portal/search.html',
      origin: 'http://evil.com/'
    },
    params: req.query
  }).then(response => {
    res.json(response.data)
  }).catch((response) => {
    res.json(response.data)
  })
})
module.exports = router
