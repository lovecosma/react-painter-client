import React from 'react'

function About() {
    return (
        <div>
            <div className="about-title">
                <h1>Welcome To The Painter App</h1>
            </div>
            <div className="about-main-description container">
                <p>
                    This app takes your computer's camera feed and processes it into dots on a canvas. The color of the dots are determined by their scaled position on the canvas in relation to the color of the corresponding pixel in the camera's feed. The dots populating the canvas, when given enough time, will sculpt a full impression of the camera's feed.
                    Four of the dots that are created will also have accompanying audio. The audio is made using granular synthesis from source audio and feedback delay. Various qualities of the dots such as size, position, and color will determine properties of the audio for that dot such as playback rate, delay feedback percentage, pitch, grain size, and more. 
                </p>
                <p>
                    This app will require temporary access to your computer's camera feed to work.
                    If you are a windows user, use Chrome. If you are a Mac user, use Safari.
                </p>
            </div>
            <div className="about-howto">
                <h2>How do I use this app?</h2>
             <ul>
                 <li>Click the painter tab on the navigation bar to navigate to the Painter.</li>
                 <li>Press the play button to begin the program. Remember to allow permission to use the camera.</li>
                 <li>Four audio samples are chosen randomly to begin with, but you can use the drop down selection inputs to choose different samples for each of the four dots.</li>
                 <li>There are three sliders that will adjusst various audio and visual parameters
                     <ul>
                   <li>Slider 1: 
                       <ul>
                           <li>Adjusts the number of dots visble. *Remember* Only four dots have audio.</li>
                           <li>Adjusts the feedback amount of the delay. Tip: If the audio seems to be getting loud and out of control or if the video is beginning to get laggy, try shifting this slider to the left.</li>
                       </ul>
                   </li>
                   <li>Slider 2:
                        <ul>
                            <li>Adjusts the size of the dots.</li>
                            <li>Adjusts the grain size in the granular synth. (Makes audio sample chunks smaller)</li>
                        </ul>
                   </li>
                   <li> Slider 3:
                       <ul>
                           <li>Adjusts the opacity of each dot.</li>
                           <li>Adjusts the delay time of the feedback delay on dots with audio.</li>
                       </ul>
                   </li>
                    </ul>
                 </li>
                 <li>The BANG button assigns random audio samples to each dot.</li>
             </ul>
            </div>
        </div>
    )
}

export default About
