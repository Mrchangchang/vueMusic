<template>
    <transition name="slide">
      <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
</template>
<script>
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getSongList} from 'api/recommend.js'
import { ERR_OK } from '../../api/config'
import {createSong} from '@/common/js/song.js'

export default {
  components: {
    MusicList
  },
  data () {
    return {
      songs: []
    }
  },
  computed: {
    title () {
      return this.disc.songListAuthor
    },
    bgImage () {
      return this.disc.picUrl
    },
    ...mapGetters([
      'disc'
    ])
  },
  created () {
    this._getSongList()
  },
  methods: {
    _getSongList () {
      if (!this.disc.ld) {
        history.back()
      }
      getSongList(this.disc.id).then(res => {
        let data = res.data
        if (data.code === ERR_OK) {
          this.songs = this.normalizeSongs(data.cdlist[0].songlist)
        }
      })
    },
    normalizeSongs (list) {
      let ret = []
      list.forEach((musicData) => {
        if (musicData.songmid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
