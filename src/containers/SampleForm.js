import React, { Component } from 'react'
import { theWindow } from 'tone/build/esm/core/context/AudioContext'

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


    render() {
        return (
            <div>
                <form action="">
                    <label for="file"></label>
                    <input onChange={this.handleFileChange} type="file" name="file" id=""></input><br/>
                    <label for="name"></label>
                    <input onChange={this.handleChange} type="text" name="name" id=""></input><br/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default SampleForm
