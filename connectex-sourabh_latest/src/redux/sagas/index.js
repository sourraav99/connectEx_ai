import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import expertiseSaga from './expertiseSaga';

export default function* rootSaga() {
    yield all([
        authSaga(),
        expertiseSaga()
    ]);
}
