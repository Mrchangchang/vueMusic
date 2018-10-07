<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>
<script>
import {mapGetters} from 'vuex'
import { getSingerDetail } from '@/api/singer'
import { ERR_OK } from 'api/config'
import { createSong } from '@/common/js/song'
import MusicList from '@/components/music-list/music-list'
export default {
  data () {
    return {
      songs: []
    }
  },
  computed: {
    ...mapGetters([
      'singer'
    ]),
    title () {
      return this.singer.name
    },
    bgImage () {
      return this.singer.avatar
    }
  },
  created () {
    this._getDetail()
  },
  methods: {
    _getDetail () {
      if (!this.singer || !this.singer.id) {
        history.back()
        return
      }
      getSingerDetail(this.singer.id).then(response => {
        if (response.code === ERR_OK) {
          this.songs = this._normalizeSongs(response.data.list)
        }
      })
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach(item => {
        let { musicData } = item
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .singer-detail
    position fixed
    top 0
    z-index 100
    left 0
    right 0
    bottom 0
    background $color-background
  .slide-enter-active,.slide-leave-active
    transition all 0.3s
  .slide-enter, .slide-leave-to
    transform translate3d(100%,0,0)
</style>
