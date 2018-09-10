/**
 * Created by chang on 2018/6/30.
 */
import state from './state'

export const singer = state => {
  return state.singer
}

export const playing = state => state.playing

export const playList = state => state.playlist

export const fullScreen = state => state.fullScreen

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const currentSong = state => {
  return state.playlist[state.currentIndex] || {}
}
