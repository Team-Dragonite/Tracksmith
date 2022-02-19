const initialState = {}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOGGED_IN': {
      return {
        ...state, username: action.payload
      }
    }
    case 'SET_CONVERSION': {
      return {
        ...state, conversion: action.payload
      }
    }
    default:
      return state
  }
}
export default reducer;
