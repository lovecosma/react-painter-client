import React from 'react'
import M from "materialize-css"
export default class MSelection extends React.Component {
 
    componentDidMount(){
        let elems = document.querySelectorAll('select');
        let instances = M.FormSelect.init(elems, {color: "black"});
    }

    render(){
        return (
            <div className="input-field col s12 dropdown">
                <select>
                    <option value="" disabled selected>Choose your option</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                </select>
            </div>
        )
    }
}
