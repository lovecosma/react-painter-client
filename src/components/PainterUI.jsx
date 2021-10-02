import React, {useState} from 'react'
import "../stylesheets/PainterUI.css"
import MSelection from './MSelection'
import MSlider from "./MSlider"
export default function PainterUI({handleChange}) {

    return (
        <div id="ui-container">
            <div id="samples-manager">
                <h5 id="samples-manager-header" >Samples Manager</h5>
                <div id="sample-dropdowns-container"> 
                        <MSelection/>
                        <MSelection/>
                        <MSelection/>
                        <MSelection/>
                </div> 
                <div id="random-samples-button">
                    <button>Randomize Samples</button>
                </div>
            </div>
            <div id="audio-effect-dashboard">
                <h5 id="audio-effect-dashboard-header" >Effects Manager</h5>
                <div id="effects-sliders-container">
                        <MSlider handleChange={handleChange} param={"Feedback"}/>
                        <MSlider handleChange={handleChange} param={"Delay Time"}/>
                        <MSlider handleChange={handleChange} param={"Dry/Wet"}/>
                </div>
            </div>


        </div>
    )
}
