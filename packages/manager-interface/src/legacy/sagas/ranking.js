import { takeLatest, call, put, select, take } from 'redux-saga/effects';
import { actions, types } from '../actions/ranking';
import { types as ethereumTypes } from '../actions/ethereum';
import { types as routeTypes } from '../actions/routes';
import { greaterThan, equals } from '../utils/functionalBigNumber';
import { getRanking, getEnvironment } from '@melonproject/melon.js';
// import rankingMock from "../utils/mocks/ranking.json";

function* getRankingSaga() {
  const isConnected = yield select(state => state.ethereum.isConnected);
  if (!isConnected) yield take(ethereumTypes.HAS_CONNECTED);

  try {
    yield put(actions.setLoading({ loading: true }));
    const environment = yield call(getEnvironment);
    const rankingList = yield call(getRanking, environment);

    yield put(actions.getRankingSucceeded(rankingList));
    yield put(actions.setLoading({ loading: false }));
  } catch (err) {
    console.error(err);
    yield put(actions.getRankingFailed(err));
  }
}

function* ranking() {
  yield takeLatest(routeTypes.RANKING, getRankingSaga);
  yield takeLatest(types.GET_RANKING_REQUESTED, getRankingSaga);
}

export default ranking;
