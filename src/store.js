import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import { format } from 'date-fns'
import ru from 'date-fns/locale/ru'

Vue.use(Vuex)

const PERPAGE = 3

export default new Vuex.Store({
  state: {
    events: [],
    currentPage: 1,
    hasMore: true
  },
  getters: {
    currentEvents: (state) => (page = 1, perPage = PERPAGE) => {
      const begin = (page - 1) * perPage
      const end = begin + perPage
      return state.events.slice(begin, end) || null
    }
  },
  mutations: {
    addEvents(state, events) {
      state.events = state.events.concat(events)
    },
    setField(state, { field, value }) {
      if (!field) return
      state[field] = value
    }
  },
  actions: {
    async fetchEvents({ state, commit }, { page = 1, perPage = PERPAGE } = {}) {
      if (!state.hasMore) return
      const url = `https://rest.vmeste-region.ru/api/votes?perPage=${perPage}&expired=true&page=${page}`
      try {
        const { data: { data: { votes, pagination }}} = await axios.get(url)
        const mappedVotes = votes.map(vote => ({
          ...vote,
          dates: `с ${format(vote.date, 'D MMMM', { locale: ru })} по ${format(vote.expire, 'D MMMM', { locale: ru })}`
        }))
        commit('addEvents', mappedVotes)
        commit('setField', { field: 'currentPage', value: +pagination.currentPage })
        commit('setField', { field: 'hasMore', value: pagination.hasMorePages })
      } catch(err) {
        console.error(err)
      }
    },
    getEvents({ commit, dispatch, getters }, { page = 1, perPage = PERPAGE } = {}) {
      if (page < 1) return
      const cachedEvents = getters.currentEvents(page)
      if (cachedEvents && cachedEvents.length) {
        return commit('setField', { field: 'currentPage', value: page })
      }
      return dispatch('fetchEvents', { page, perPage })
    },
    setCurrentPage({ commit }, value) {
      commit('setField', { field: 'currentPage', value })
    }
  }
})
