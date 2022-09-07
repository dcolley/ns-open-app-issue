import { Http } from "@nativescript/core"
import { CandidateModel } from "~/models/Candidate"

interface IState {
  loading: boolean
  list: CandidateModel[]
  model: CandidateModel | undefined
}

const emptyModel = {
  name: 'undefined'
} as CandidateModel

const candidate = {
  namespaced: true,
  state: {
    loading: false,
    list: [],
    model: emptyModel
  } as IState,
  getters: {},
  mutations: {
    SET_LOADING (state: IState, loading: boolean) {
      state.loading = loading
    },
    SET_LIST (state: IState, list: CandidateModel[]) {
      console.log('SET_LIST', list.length)
      state.list = list
    },
    SET_MODEL (state: IState, model: CandidateModel) {
      state.model = model
    }
  },
  actions: {
    async setList ({ rootState, commit }: any) {
      console.log('store/modules/candidate.ts: actions.getList()... ' + rootState.chain)
      const url = "https://api.metaspan.io/api/"+rootState.chain+"/candidate"
      await commit('SET_LOADING', true)
      try {
        const ret: any = await Http.getJSON(url)
        if (ret) {
          console.log('found ' + ret.length + ' candidates')
          await commit('SET_LIST', ret)
         } else {
          console.log('what did we get?', ret)
        }  
      } catch (err) {
        console.warn(err)
      } finally {
        await commit('SET_LOADING', false)
      }
    },
    setModel ({ state, commit }: any, { stash }: any) {
      const model = state.list.find((f:any) => f.stash === stash)
      if(model) commit('SET_MODEL', model)
    }
  }
}

export default candidate
