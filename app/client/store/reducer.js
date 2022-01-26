const initialState = {
  todos: [
    { id: 0, text: 'Learn React', completed: true },
    { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
    { id: 2, text: 'Build something fun!', completed: false, color: 'blue' }
  ],
  filters: {
    status: 'All',
    colors: []
  }
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOGGED_IN': {
      return {
        ...state, username: action.payload.username
      }
    }
    default:
      return state
  }
}
export default reducer;
