const redux = require('redux');
const reduxLogger = require('redux-logger');
const combineReducers = redux.combineReducers;
const createStore = redux.createStore;
const logger = reduxLogger.createLogger();
const applyMiddeleWare = redux.applyMiddleware;

// Types
const BUY_MILK = 'BUY_MILK';
const BUY_CURD = 'BUY_CURD';

// Action creater
function buyMilk() {
  return {
    type: BUY_MILK,
  }
}
function buyCurd() {
  return {
    type: BUY_CURD,
  }
}

// Initial States
const initialMilkState = {
  numOfMilkPacks: 10,
}
const initialCurdState = {
  numOfCurdPacks: 20,
}

//Reducers
const milkReducer = (state=initialMilkState, action)  => {
  switch(action.type) {
    case BUY_MILK:
      return {
        ...state,
        numOfMilkPacks: state.numOfMilkPacks - 1
      }
    default:
      return state
  }
}
const curdReducer = (state=initialCurdState, action)  => {
  switch(action.type) {
    case BUY_CURD:
      return {
        ...state,
        numOfCurdPacks: state.numOfCurdPacks - 1
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  milkReducer,
  curdReducer
})

const store = createStore (rootReducer, applyMiddeleWare(logger))
console.log('Initial State', store.getState());
const unsubscriber = store.subscribe(() => {})
store.dispatch(buyMilk())
store.dispatch(buyMilk())
store.dispatch(buyMilk())
store.dispatch(buyCurd())
store.dispatch(buyCurd())
store.dispatch(buyCurd())
unsubscriber()