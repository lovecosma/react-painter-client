const createSample = sample => {
    return dispatch => {
        dispatch({type: 'START_ADDING_SAMPLE_REQUEST'})
        const formData = new FormData();
        formData.append("name", sample.name);
        formData.append("file", sample.file);

        const configObj = {
            method: "POST",
            body: formData
        }
        fetch('http://localhost:3001/samples', configObj)
        .then(resp => resp.json())
        .then(sample => {
            dispatch({type: "ADD_SAMPLE", sample})
        })
        .catch(error => console.log(error))
    }
}


export default createSample