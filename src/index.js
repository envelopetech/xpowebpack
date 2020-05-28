import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';
//import masterreducer from './store/reducers/masters';
import userprofilereducer from './store/reducers/userprofile';
import authReducer from './store/reducers/auth';
import { reducer as formReducer } from 'redux-form';
import streamlinereducer from './store/reducers/streamline'
import postenquiriesreducer from './store/reducers/postenquiries'

//const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

 const composeEnhancers =
     typeof window === 'object' &&
       window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
       window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;


const rootReducer = combineReducers({ 
     //masters:  masterreducer,       
     //profile: profilereducer,
    //wingsreducer:wingsreducer,
    userprofilereducer:userprofilereducer,
    streamlinereducer:streamlinereducer,
    form: formReducer,
    postenquiriesreducer:postenquiriesreducer,
    //moderatorapplication:moderatorapplicationReducer,
    auth: authReducer
    
});
// let enhancer;
// if (process.env.NODE_ENV === 'development') {
//   const composeEnhancers =
//     typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//       ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
//       : compose;

//   enhancer = composeEnhancers(
//     applyMiddleware(thunk)
//   );
// } else {
//   enhancer = compose(
//     applyMiddleware(thunk)
//   );
// }
 const store = createStore(rootReducer, composeEnhancers(
     applyMiddleware(thunk)
 ));
//const store = createStore(rootReducer, enhancer);
const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render( app, document.getElementById( 'root' ) );
//registerServiceWorker();
