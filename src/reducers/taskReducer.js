const taskReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TASKS':
      return {
        ...state,
        tasks: action.payload
      };

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(t => t.id !== action.payload)
      };

    case 'LOGIN':
      return {
        ...state,
        username: action.payload
      };

    case 'LOGOUT':
      return {
        ...state,
        username: null,
        tasks: []
      };

    default:
      return state;
  }
};

export default taskReducer;
