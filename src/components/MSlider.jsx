import React from 'react'

export default function MSlider({param, handleChange}) {
    return (
        <div>
            <label for="range">{param}</label>
            <p class="range-field">
                <input onChange={(e)=> handleChange(e)} name={param} type="range" id="test5" min="0" max="100" defaultValue={50}/>
            </p>
        </div>
    )
}
