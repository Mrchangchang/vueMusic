<template>
    <scroll ref="suggest" class="suggest" :data="result" :pullup="pullup" @scrollToEnd="searchMove">
      <ul class="suggest-list">
        <li class="suggest-item" v-for="item in result" :key="item.singermid">
          <div class="icon">
            <i :class="getIconCls(item)"></i>
          </div>
          <div class="name">
            <p class="text" v-html="getDisplayName(item)"></p>
          </div>
        </li>
      </ul>
      <loading v-show="hasMore" title="加载中"></loading>
    </scroll>
</template>
<script>
import { search } from '@/api/search.js'
import {ERR_OK} from '@/api/config.js'
import {createSong} from '@/common/js/song.js'
import Scroll from '@/base/scroll/scroll'
import Loading from '@/base/loading/loading'

const PERPAGE = 20
const TYPE_SINGER = 'singer'
export default {
  components: {
    Scroll, Loading
  },
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      page: 1,
      result: [],
      pullup: true,
      hasMore: true
    }
  },
  filters: {

  },
  watch: {
    query () {
      this.search()
    }
  },
  methods: {
    search () {
      this.page = 1
      this.hasMore = true
      this.$refs.suggest.scrollTo(0, 0)
      search(this.query, this.page, this.showSinger, PERPAGE).then(res => {
        let data = res.data
        if (data.code === ERR_OK) {
          this.result = this._getResult(data.data)
          this._checkMore(data.data)
        }
      })
    },
    _getResult (data) {
      let ret = []
      if (data.zhida && data.zhida.singerid) {
        ret.push({...data.zhida, ...{type: TYPE_SINGER}})
      }
      if (data.song) {
        ret = ret.concat(this._normalizeSongs(data.song.list))
      }
      return ret
    },
    getIconCls (item) {
      if (item.type === TYPE_SINGER) {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    },
    getDisplayName (item) {
      if (item.type === TYPE_SINGER) {
        return item.singername
      } else {
        return `${item.name}-${item.singer}`
      }
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach((musicData) => {
        if (musicData.songid && musicData.albumid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    },
    searchMove () {
      if (!this.hasMove) {
        return
      }
      this.page++
      search(this.query, this.page, this.showSinger, PERPAGE).then(res => {
        let data = res.data
        if (data.code === ERR_OK) {
          this.result = this.result.concat(this._getResult(data.data))
          this._checkMore(data.data)
        }
      })
    },
    _checkMore (data) {
      const song = data.song
      if (!song.list.length || (song.curnum + song.curpage * PERPAGE) > song.totalnum) {
        this.hasMore = false
      }
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
