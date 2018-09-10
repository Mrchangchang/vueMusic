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
    console.log(response.data, 'key返回值')
    res.send(response.data)
  }).catch(response => {
    console.log(response.data)
    res.send(response)
  })
})

module.exports = router
