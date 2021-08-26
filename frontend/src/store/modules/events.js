import axios from 'axios';

const apiUrl = 'http://localhost:3000';

// 状態管理するデータを定義する
const state = {
  events: [],
  event: null,
  isEditMode: false,
};

// stateの値を取り出す関数を定義する
const getters = {
  //すべての予定をDate型に修正し取得する。
  events: (state) => state.events.map((event) => {
      return {
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      };
    }),
  // クリックされた予定をDate型に修正し取得する。
  event: (state) => state.event ? {
    ...state.event,
    start: new Date(state.event.start),
    end: new Date(state.event.end)
  } : null,
  // 編集モードか状態を取得する。
  isEditMode: (state) => state.isEditMode,
};

// eventsデータをstateに保存する関数を定義する
const mutations = {
  setEvents: (state, events) => (state.events = events),
  setEvent: (state, event) => (state.event = event),
  appendEvent: (state, event) => (state.events = [...state.events, event]),
  setEditMode: (state, boolean) => (state.isEditMode = boolean),
};

// axiosでAPIリクエストを送信してeventsデータを取得し、mutationを呼び出す関数を定義する
const actions = {
  async fetchEvents({ commit }) {
    const response = await axios.get(`${apiUrl}/events`);
    commit('setEvents', response.data);
  },
  async createEvent({ commit }, event) {
    const response = await axios.post(`${apiUrl}/events`, event);
    commit('appendEvent', response.data);
  },
  setEvent({ commit }, event) {
    commit('setEvent', event);
  },
  setEditMode({ commit }, boolean) {
    commit('setEditMode', boolean);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
