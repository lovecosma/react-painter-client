function samplesReducer(state = { samples: [], requesting: false, error: false}, action) {
    switch (action.type) {
      case 'START_ADDING_SAMPLE_REQUEST':
        return {
          ...state,
          requesting: true
        }
      case 'ADD_SAMPLE':
        return {
          ...state,
          samples: [...state.samples, action.sample],
          requesting: false
        }
        default:
            return {
                ...state
            }
    }
}

export default samplesReducer 