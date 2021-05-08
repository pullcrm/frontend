import { Module } from 'vuex/types'

import { IState as IRootState } from '.'

export interface IStateHistoryItem {
  url: string,
  path: string,
  name: string,
  query: Record<string,
    | string
    | string[]
  >,
  params: Record<string,
    | string
    | string[]
  >,
  fullPath: string
}

export interface IState {
  history: IStateHistoryItem[],
  analyticsParams: Record<string, string>,
  renderedRoutePath: string
}

const LocationModule: Module<IState, IRootState> = {
  namespaced: true,

  state () {
    return {
      history: [],
      analyticsParams: {},
      renderedRoutePath: null
    }
  },

  mutations: {
    SET_ANALYTICS_PARAMS (state, params: IState['analyticsParams']) {
      state.analyticsParams = params
    },

    SET_RENDERED_ROUTE_PATH (state, path: IState['renderedRoutePath']) {
      state.renderedRoutePath = path
    },

    ADD (state, route) {
      const { host, protocol } = window.location

      const item = {
        url: `${protocol}//${host}${route.fullPath}`,
        path: route.path,
        name: route.name,
        query: route.query,
        params: route.params,
        fullPath: route.fullPath
      }

      state.history = [item, ...state.history.slice(0, 2)]
    }
  },

  getters: {
    // host () {
    //   return window.location.host
    // },

    // userAgent () {
    //   return window.navigator.userAgent
    // },

    // current (state, localGetters) {
    //   return {
    //     host: localGetters.host,
    //     userAgent: localGetters.userAgent,
    //     ...state.history[0]
    //   }
    // },

    // from (state, localGetters) {
    //   if (state.history.length > 1) {
    //     return {
    //       host: localGetters.host,
    //       userAgent: localGetters.userAgent,
    //       ...state.history[1]
    //     }
    //   }

    //   return null
    // }
  }
}

export default LocationModule
