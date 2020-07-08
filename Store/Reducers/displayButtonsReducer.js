// Store/Reducers/displayButtonsReducer.js

const initialState = { buttons: [] }

function displayButtons(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'BUTTONS':
      nextState = {
        ...state,
        buttons: [action.value]
      }
      return nextState || state
    default:
      return state
  }
}

export default displayButtons
