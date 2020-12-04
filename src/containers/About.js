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

            </div>
        </div>
    )
}

export default About
