<template>
    <div class="singer">
      <list-view :data="singer" @selectIndex="toggleList" @selectItem="selectItem"></list-view>
      <router-view></router-view>
    </div>
</template>
<script>
import {getSingerList} from 'api/singer'
//import {ERR_OK} from 'api/config'
import Singer from 'common/js/singer'
import ListView from 'base/listview/listview'
import {mapMutations } from 'vuex'

const HOT_NAME = '热门'
const HOT_SINGER_LGN = 10

export default {
  data () {
    return {
      singer: {},
      index: []
    }
  },
  created () {
    this._getSingerList(-100)
  },
  methods: {
    _getSingerList (index) {
      getSingerList(index).then((res) => {
        if (res.data.code === 0) {
          this.singer = this._normalizeSinger(res.data.singerList.data)
        }
      })
    },
    _normalizeSinger (data) {
      let list = data.singerlist
      data.tags.index.pop()
      let index = data.tags.index
      let hot = {
        title: HOT_NAME,
        items: [],
        indexs: index,
        index: data.index
      }
      if (data.index > 0) {
        hot.title = index[data.index].name
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LGN) {
          hot.items.push(new Singer(item.singer_mid, item.singer_name, item.singer_pic))
        }
      })
      return hot
    },
    toggleList (item) {
      this._getSingerList(item.id)
    },
    selectItem (singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  components: {
    ListView
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.singer
  position fixed
  top 88px
  bottom 0
  width 100%
</style>
