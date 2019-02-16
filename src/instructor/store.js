import VuexPersistence from 'vuex-persist'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const store = new Vuex.Store({
  state: {
    isAuthorized: false,
    coInfo: {
      uid: '',
      instructor: [''],
      name: '',
      code: '',
      semester: '',
      year: 0,
      homepage: ''
    },
    assignments: {
      name: '',
      uid: '',
      deadline: 0,
      release_date: 0,
      descr_link: '',
      score: 0,
      overall_socre: 0
    },
    baseInfo: {
      uid: '23123',
      isInstructor: true
    }
  },
  mutations: {
    updateCoInfo (state, value) {
      state.coInfo = value
    }
  },
  plugins: [vuexLocal.plugin]
})

export default store
