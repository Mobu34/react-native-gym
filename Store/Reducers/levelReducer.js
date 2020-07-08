// Store/Reducers/levelReducer.js

const initialState = { level: [] }

function selectLevel(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'SELECT_LEVEL':
      nextState = {
        ...state,
        level: [action.value]
      }
      return nextState || state
    default:
      return state
  }
}

export default selectLevel
