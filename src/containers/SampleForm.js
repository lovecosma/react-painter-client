import React, { Component } from 'react'
import addSample from '../actions/addSample'
import fetchSamples from '../actions/fetchSamples'
import {connect} from 'react-redux'

export class SampleForm extends Component {
    state={
        file: "",
        name: ""
    }

    handleFileChange = e => {
        if(e.target.files[0]){
            this.setState({
                [e.target.name]: e.target.files[0]
            }) 
        }

    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.addSample(this.state)
    }

    componentDidMount = () => {
        this.props.fetchSamples()
    }

    render() {
        if(this.props.samplesReducer.requesting){
            return <div>Loading...</div>
        } else {
        const sampleCards = this.props.samplesReducer.samples.map(sample => {
            return (
                <div>
                    <p>{sample.name}</p>
                    <p>{sample.url}</p>
                </div>
            )
        })
        return (
            <div>
                <form onSubmit={this.handleSubmit} action="">
                    <label htmlFor="file"></label>
                    <input onChange={this.handleFileChange} type="file" name="file" id=""></input><br/>
                    <label htmlFor="name"></label>
                    <input onChange={this.handleChange} type="text" name="name" id=""></input><br/>
                    <button type="submit">Submit</button>
                </form>
                {sampleCards}
            </div>
        )
        }
    }
}

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps, {addSample, fetchSamples})(SampleForm)
