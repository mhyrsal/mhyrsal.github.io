import { all } from 'redux-saga/effects';
import githubSearchSagas from './githubSearch/sagas';
import dataLoadSagas from './dataLoad/sagas';

export default function* devSaga() {
  yield all([githubSearchSagas(), dataLoadSagas()]);
}
