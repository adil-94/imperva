import { all } from "redux-saga/effects";
import impervaCustomerListSaga from "./customer_list_saga";

function* rootSaga() {
  yield all([impervaCustomerListSaga()]);
}

export default rootSaga;
