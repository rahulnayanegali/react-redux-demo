
const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios');

// State
const initialState = {  
    loading: false,
    data: [],
    error: '',
}

// types
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users,
    }
}

const fetchUsersFailure = error => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error,  
    }
}

// Reducer
const reducer = (state=initialState, action) => {
    switch(action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,         
                loading: true
            }
        case FETCH_USERS_SUCCESS:
            return {
              loading: false,
              data: action.payload,
              error: '',
            }
        case FETCH_USERS_FAILURE:
          return {
            loading: false,
            data: [],
            error: action.payload,
          }
    }
}

const fetchUsers = () => {
  return function(dispatch) {
    dispatch(fetchUsersRequest())
    axios.get('https://jsonplacehlder.typicode.com/users')
    .then(response => {
      // response.data is the a
      const users = response.data.map(user => user.id)
      dispatch(fetchUsersSuccess(users))
    })
    .catch(error => {
      //error msg
      dispatch(fetchUsersFailure(error.message))
    })
  }
}
const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => { console.log(store.getState())})
store.dispatch(fetchUsers());