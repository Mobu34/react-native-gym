// Store/Reducers/goallReducer.js

const initialState = { goal: [] }

function selectGoal(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'SELECT_GOAL':
      nextState = {
        ...state,
        goal: [action.value]
      }
      return nextState || state
    default:
      return state
  }
}

export default selectGoal
