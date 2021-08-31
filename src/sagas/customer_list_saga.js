import { put, takeLatest, all, call, select } from 'redux-saga/effects'
import axios from 'axios'
import {
  GET_LOADER, CUSTOMER_LIST, SET_CUSTOMER_LIST, GET_DIGEST_LIST,
  SET_DIGESTED_IDS, GET_DIGESTED_IDS, GET_CURRENT_PAGE, GET_COUNT_ACTIVE_USERS,
} from '../constants/imperva_constants';
import * as selectors from '../selectors'

async function apiFetchFoo(fname) {
  return await axios.get(`https://api.hashify.net/hash/md4/hex?value=${fname}`);
}
const getCustomerListrunOurAction = function* (data) {
  let digestedIds = yield select(selectors.digestedIds);
  let customersList = [], activeUsers = 0;
  yield axios.get(`https://run.mocky.io/v3/93a7ac54-14e7-43a0-8a8d-8e3821cf74d0`)
    .then((response) => {
      customersList = response.data;
      for (let i = 0; i < customersList.length; i++) {
        if (customersList[i].isActive) {
          activeUsers++;
        }
      }
    }).catch((error) => {
      console.log(error);
    })
  for (let i = 0; i < 10; i++) {
    if (!digestedIds.has(0)) {
      const results = yield call(apiFetchFoo, customersList[i].name.first + customersList[i].name.last);
      customersList[i].digest = results.data.Digest;
    }
  }
  digestedIds.set(0)
  yield put({ type: SET_CUSTOMER_LIST, payload: customersList });
  yield put({ type: GET_LOADER, payload: false });
  yield put({ type: SET_DIGESTED_IDS, payload: digestedIds });
  yield put({ type: GET_COUNT_ACTIVE_USERS, payload: activeUsers });
};
function* getCustomerListDataWatcher(data) {
  yield takeLatest(CUSTOMER_LIST, getCustomerListrunOurAction);
}

//Digest value
const getCustomerDigestrunOurAction = function* (data) {
  let digestedIds = yield select(selectors.digestedIds);
  let page = data.payload.newPage;
  let customersList = [...data.payload.customerList]

  for (let i = page * 10; i < (page * 10) + 9; i++) {
    if (!digestedIds.has(page) && page != 0) {
      const results = yield call(apiFetchFoo, customersList[i].name.first + customersList[i].name.last);
      customersList[i].digest = results.data.Digest;
    }
  }
  digestedIds.set(page)
  yield put({ type: SET_DIGESTED_IDS, payload: digestedIds });
  yield put({ type: GET_CURRENT_PAGE, payload: page });
  yield put({ type: GET_LOADER, payload: false });
};
function* getCustomerDigestDataWatcher(data) {
  yield takeLatest(GET_DIGESTED_IDS, getCustomerDigestrunOurAction);
}

export default function* rootSaga() {
  yield all([getCustomerListDataWatcher(), getCustomerDigestDataWatcher()]);
}