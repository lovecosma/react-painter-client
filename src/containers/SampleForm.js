import React, { Component } from 'react'

export class SampleForm extends Component {
    render() {
        return (
            <div>
                <form action="">
                    <label for="file"></label>
                    <input type="file" name="file" id=""></input><br/>
                    <label for="name"></label>
                    <input type="text" name="name" id=""></input><br/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default SampleForm
