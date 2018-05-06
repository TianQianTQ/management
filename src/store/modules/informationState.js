import webapi from '../../api/webapi'
const personImg = {
  state:{
    url:null
  },
  motations:{
    setUrl(state, paylaod) {
      state.url = paylaod
    },
  },
  actions:{

  }
}
const userUEState = {
  actions: {

    async postGps({commit, rootState}, payload) {
      try {
        let params = rootState.userUEState.lonlat
        if (rootState.userUEState.lonlat.lat) {
          params.lat = Number(rootState.userUEState.lonlat.lat)
        }
        if (rootState.userUEState.lonlat.lon) {
          params.lon = Number(rootState.userUEState.lonlat.lon)
        }
        const res = await webapi.credit.postGps({
          lat: params.lat,
          lon: params.lon,
          needPush: 1,
          phase: payload.phase
        })
        if (res.code !== 200) {
          commit('setHasGPS', 'outOfArea')
        } else {
          commit('setHasGPS', 'rightArea')
        }
      } catch (e) {
        commit('setHasGPS', 'outOfArea')
        console.error(e)
      }
    }
  },

}

export default informationState
