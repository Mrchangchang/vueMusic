import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/components/recommend/recommend.vue'
import Singer from '@/components/singer/singer'
import Rank from '@/components/rank/rank'
import Search from '@/components/search/search'
import SingerDetail from '@/components/singer-detail/singer-detail'
import Disc from '@/components/disc/disc.vue'
import TopList from '@/components/top-list/top-list.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend,
      children: [{
        path: ':id',
        name: 'disc',
        component: Disc
      }]
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer,
      children: [
        {
          path: ':id',
          name: 'SingerDetail',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank,
      children: [
        {
          path: ':id',
          name: 'TopList',
          component: TopList
        }
      ]
    },
    {
      path: '/search',
      name: 'rank',
      component: Search
    }
  ]
})
