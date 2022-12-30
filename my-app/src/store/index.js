import {createStore, combineReducers,  applyMiddleware } from 'redux'
import  {  composeWithDevTools  }  from  'redux-devtools-extension' ;

import TimerReducer from './reducers/TimerReducer'
import ThemeReducer from './reducers/ThemeReducer'
import AudioReducer from './reducers/AudioReducer'
import VibroReducer from './reducers/VibroReducer'
import SaveTimerReducer from './reducers/SaveTimerReducer'


const rootReducers = combineReducers({
    TimerReducer,
    ThemeReducer,
    AudioReducer,
    VibroReducer,
    SaveTimerReducer
})

const store = createStore(rootReducers, composeWithDevTools())


export default store;