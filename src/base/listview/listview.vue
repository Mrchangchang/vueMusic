<template>
  <scroll class="listview" :data="data.items">
    <ul>
      <li class="list-group">
        <h2 class="list-group-title">{{data.title}}</h2>
        <ul>
          <li v-for="item in data.items" class="list-group-item" @click="selectItem(item)">
            <img class="avatar" :src="item.avatar" alt="" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut">
      <ul>
        <!--{{shortCutList}}-->
        <li v-for="item in shortCutList" class="item" :class="{'current':data.index == item.id}" @click="selectIndex(item)">
          {{item.name.substring(0, 1)}}
        </li>
      </ul>
    </div>
    <div v-show="!data" class="loading-container">
      <loading></loading>
    </div>
  </scroll>
</template>
<script>
import Scroll from './../scroll/scroll.vue'
import Loading from './../loading/loading.vue'

export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    shortCutList () {
      if (this.data.indexs) {
        return this.data.indexs.map((item) => {
          return item
        })
      } else {
        return []
      }
    }
  },
  components: {
    Scroll,
    Loading
  },
  methods: {
    selectIndex (item) {
      this.$emit('selectIndex', item)
    },
    selectItem (item) {
      this.$emit('selectItem', item)
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
