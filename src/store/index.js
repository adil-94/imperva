import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers/root_reducer';
import Saga from '../sagas/root_saga';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__ || compose
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const enhancers = [];
if(middleware.length > 0 ){
    enhancers.push(applyMiddleware(...middleware))
}
const store = createStore(rootReducer,composeEnhancers(...enhancers))
sagaMiddleware.run(Saga)

export default store;
