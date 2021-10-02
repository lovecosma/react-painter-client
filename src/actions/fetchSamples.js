const fetchSamples = () => {
    return dispatch => {
        dispatch({type: 'START_FETCHING_SAMPLES_REQUEST'})
        fetch('https://painter-api.herokuapp.com/samples')
        .then(resp => resp.json())
        .then(samples => {
            dispatch({type: 'ADD_SAMPLES', samples})
        })
        .catch(error => alert(error))
    }
}


export default fetchSamples
