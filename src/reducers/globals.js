import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import Types from '@actions/actionTypes';

export const initialState = Immutable({
  homeTab: 'HOME',
  projectTab: 'list', // list, main, chart, report
  detailStatus: false
});
const homeTab = (state, action) => ({
  ...state,
  homeTab: action.homeTab,
});
const projectTab = (state, action) => ({
  ...state,
  projectTab: action.projectTab,
});
const setDetail = (state, action) => ({
  ...state,
  detailStatus: action.status,
});
const actionHandlers = {
  [Types.SET_HOME_TAB]: homeTab,
  [Types.SET_PROJECT_TAB]: projectTab,
  [Types.SET_DETAIL]: setDetail,
};
export default createReducer(initialState, actionHandlers);
