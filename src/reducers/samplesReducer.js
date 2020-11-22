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
        case 'START_FETCHING_SAMPLES_REQUEST':
        return {
          ...state,
          requesting: true
        }
      case 'ADD_SAMPLES':
        return {
          ...state,
          samples: [...action.samples],
          requesting: false
        }
        default:
            return {
                ...state
            }
    }
}

export default samplesReducer 