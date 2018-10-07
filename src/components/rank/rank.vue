<template>
    <div class="rank" ref="rank">
      <scroll :data="topList" class="toplist" ref="topList">
        <ul>
          <li class="item" v-for="(item, $index) in topList" :key="$index" @click="selectItem(item)">
            <div class="icon">
              <img src="" width="100" height="100" alt="" v-lazy="item.picUrl"/>
            </div>
            <ul class="songlist">
              <li class="song" v-for="(song, $index) in item.songList" :key="$index">
                <span>{{$index+1}}</span>
                <span>{{song.songname}}--{{song.singername}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </scroll>
      <div class="loading-container" v-show="!topList.length">
        <loading></loading>
      </div>
      <router-view></router-view>
    </div>
</template>
<script>
import {getTopList} from '@/api/rank.js'
import {ERR_OK} from 'api/config'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {playlistMixin} from 'common/js/mixin'
import {mapGetters, mapMutations} from 'vuex'

export default {
  mixin: [playlistMixin],
  components: {
    Scroll,
    Loading
  },
  data () {
    return {
      topList: []
    }
  },
  created () {
    setTimeout(()=>{
      this._getTopList()
    }, 1000)

  },
  methods: {
    handlePlaylist (playlist) {
      const bottom = playlist && playlist.length > 0 ? '60px' : ''
      this.$refs.rank.style.bottom = bottom
      this.$refs.topList.refresh()
    },
    _getTopList () {
      getTopList().then(res => {
        let data = res.data
        if (data.code === ERR_OK) {
          this.topList = data.data.topList

        }
      })
    },
    selectItem (item) {
      this.SET_TOP_LIST(item)
      this.$router.push({
        path: `/rank/${item.id}`
      })

    },
    ...mapMutations([
      'SET_TOP_LIST'
    ])
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .toplist
      height: 100%
      overflow: hidden
      .item
        display: flex
        margin: 0 20px
        padding-top: 20px
        height: 100px
        &:last-child
          padding-bottom: 20px
        .icon
          flex: 0 0 100px
          width: 100px
          height: 100px
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 20px
          height: 100px
          overflow: hidden
          background: $color-highlight-background
          color: $color-text-d
          font-size: $font-size-small
          .song
            no-wrap()
            line-height: 26px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
