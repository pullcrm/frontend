import { Route } from 'vue-router/types'
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
  host: string,
  baseHost: string,
  userIp: string,
  userAgent: string,
  analyticsParams: Record<string, string>,
  renderedRoutePath: string
}

const LocationModule: Module<IState, IRootState> = {
  namespaced: true,

  state () {
    return {
      history: [],
      host: null,
      baseHost: null,
      userIp: null,
      userAgent: null,
      analyticsParams: {},
      renderedRoutePath: null
    }
  },

  mutations: {
    SET_HOST (state, host: IState['host']) {
      state.host = host
    },

    SET_BASE_HOST (state, baseHost: IState['baseHost']) {
      state.baseHost = baseHost
    },

    SET_USER_IP (state, userIp: IState['userIp']) {
      state.userIp = userIp
    },

    SET_USER_AGENT (state, userAgent: IState['userAgent']) {
      state.userAgent = userAgent
    },

    SET_ANALYTICS_PARAMS (state, params: IState['analyticsParams']) {
      state.analyticsParams = params
    },

    SET_RENDERED_ROUTE_PATH (state, path: IState['renderedRoutePath']) {
      state.renderedRoutePath = path
    },

    ADD (state, route: Route) {
      const item = {
        url: `https://${state.host}${route.fullPath}`,
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
    current (state) {
      return {
        host: state.host,
        baseHost: state.baseHost,
        userAgent: state.userAgent,
        ...state.history[0]
      }
    },

    from (state) {
      if (state.history.length > 1) {
        return {
          host: state.host,
          baseHost: state.baseHost,
          userAgent: state.userAgent,
          ...state.history[1]
        }
      }

      return null
    }
  }
}

export default LocationModule
