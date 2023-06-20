import Vue from 'vue'
import Vuex from 'vuex'
import createVuexAlong from 'vuex-along'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    email: "email初始值",
    updateId: -1,
    updateTitle: -1,
    updateContent: -1,
  },
  mutations: {
    setUpdateId(state, id) {
      state.updateId = id;
    },
    setUpdateTitle(state, title) {
      state.updateTitle = title;
    },
    setUpdateContent(state, content) {
      state.updateContent = content;
    },
    increment (state) {
      state.count++
    },
    sendEmailVal(state, emailVal) {
      state.email = emailVal;
    }
  }
})

export default store