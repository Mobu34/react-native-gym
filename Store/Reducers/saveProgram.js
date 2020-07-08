// Store/Reducers/saveProgram.js

const initialState = { savedPrograms: [] }

function saveProgram(state = initialState, action) {
  let nextState
  switch(action.type) {
    case 'SAVE_PROGRAM':
      nextState = {
        ...state,
        savedPrograms: [action.value, ...state.savedPrograms]
      }
      return nextState || state
    case 'DELETE_PROGRAM':
      state.savedPrograms.splice(action.value, 1)
      nextState = {
        ...state,
        savedPrograms: [...state.savedPrograms]
      }
      return nextState || state

    default:
      return state
  }
}
export default saveProgram
