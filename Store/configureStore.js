// Store/configureStore.js

import { createStore } from 'redux'
import saveProgram from './Reducers/saveProgram'
import selectLevel from './Reducers/levelReducer'
import selectGoal from './Reducers/goalReducer'
import displayButtons from './Reducers/displayButtonsReducer'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistCombineReducers } from 'redux-persist'

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['selectLevel', 'selectGoal', 'displayButtons']
}

export default createStore(persistCombineReducers(rootPersistConfig, {saveProgram, selectLevel, selectGoal, displayButtons}))
