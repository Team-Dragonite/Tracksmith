const initialState = {
  conversions: {
    totals: 100,
    hrScreen: 60,
    technicalInterview: 40,
    onSite: 3
  }
}



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
