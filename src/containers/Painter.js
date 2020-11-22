import React, { Component } from 'react'
import Sketch from "react-p5";
import * as Tone from 'tone'
import Particle from './Particle'
import SoundParticle from './SoundParticle'

let video;
let vScale = 8
let buffers
let bang
let particles = [];
let sound_particles = []
let slider;
let numberOfParticles = 0

export class Painter extends Component {
    state = {
        playing: false,
    }
     preload = p5 => {
        buffers = p5.loadJSON("http://localhost:3001/samples");
     }

     play = async () => {
        this.setState({playing: true})
        await Tone.start()
        console.log('audio is ready')
    }

    setup = (p5, canvasParentRef) => {
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)
        p5.createCanvas(640, 480).parent(canvasParentRef);
        p5.pixelDensity(1)
        video = p5.createCapture(p5.VIDEO)
        video.size(p5.width/vScale, p5.height/vScale)
        p5.createElement('br');
        slider = p5.createSlider(0, 255, 0, 1);
        slider.style("width", "250px")
        p5.createElement('br');
        bang = p5.createButton("BANG"); 
        bang.mousePressed(this.changeSamples.bind(p5))
        for(let i = 0; i < 4; i++){
            sound_particles.push(new SoundParticle(p5.random(0, p5.width), p5.random(0, p5.height), p5.floor(p5.random(0, Object.entries(buffers).length-1)), p5, buffers, slider, vScale, video))
        }
        for(let i = 0; i < 100; i++){
            particles.push(new Particle(p5.random(0, p5.width), p5.random(0, p5.height), p5, vScale, video))
        }
    };
    
    changeSamples(){
        for(let i = 0; i < sound_particles.length; i++){
            sound_particles[i].urlSwitch(this.floor(this.random(0, Object.entries(buffers).length-1)));
        } 
    }

    draw = (p5) => {
        video.loadPixels();
        let val = slider.value()
        numberOfParticles = p5.map(val, 0, 255, 0, 50)
        for(let i = 0; i < numberOfParticles; i++){
            particles[i].update();
            particles[i].show();
        }
        for(let i = 0; i < sound_particles.length; i++){
            sound_particles[i].update();
            sound_particles[i].show();
        }
        // NOTE: Do not use setState in the draw function or in functions that are executed
        // in the draw function...
        // please use normal variables or class properties for these purposes
    };
    render() {
        if(this.state.playing){
        return (
            <div>
                <Sketch preload={this.preload} setup={this.setup} draw={this.draw} />
            </div>
        )
        } else {
            return <button onClick={this.play}>PLAY</button>

        }
    }
}

export default Painter
