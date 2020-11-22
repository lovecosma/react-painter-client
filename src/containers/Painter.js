import React, { Component } from 'react'
import Sketch from "react-p5";
import * as Tone from 'tone'

let video;
let vScale = 8
let buffers
let bang
let particles = [];
let sound_particles = []
let slider;
let numberOfParticles = 0

// let loaded = false
function SoundParticle(x, y, i, p5){
    this.x = x;
    this.y = y;
    this.i = i;
    this.loaded = false
    this.grainVol = 0
    this.grainOverlap = 0.05
    this.grainSize = 0.01
    this.grainPlaybackRate = 1
    this.grainDetune = 50
    this.feedbackDelay = new Tone.FeedbackDelay(0.125, 0.5).toDestination();
    this.grain = new Tone.GrainPlayer({
        "url": buffers[this.i].url,
        "mute": false,
        "volume": this.grainVol,
        "overlap": this.grainOverlap,
        "grainSize": this.grainSize,
        "playbackRate": this.grainPlaybackRate,
        "detune": this.grainDetune,
        "loop": true,
        "loopStart": 0,
        "loopEnd": 4,
        "reverse": false,
        "onload": () => {
            this.grain.connect(this.feedbackDelay).start()
        }
    })

    this.update = function(){
        this.x += p5.random(-10, 10);
        this.y += p5.random(-10, 10);
        if(this.x >= 640){
            this.x = this.x - 200
            this.grain.reverse = !this.grain.reverse
        } else if(this.x <= 0){
            this.x = this.x + 200
            this.grain.reverse = !this.grain.reverse
        }
        if(this.y >= 420){
            this.y = this.y - 200
            // this.grain.playbackRate = p5. * 2

        } else if(this.y < 0){
           this.y = this.y + 200
        //    this.grain.playbackRate = this.grain.playbackRate * 0.5
        }
    }

    this.show = function(){
        p5.noStroke();
        let val = slider.value()
        let px = p5.floor(this.x / vScale)
        let py = p5.floor(this.y / vScale)
        let col = video.get(px, py)
        this.grain.volume.value = p5.map(this.x, 0, 640, -30, 0)
        this.grainOverlap = p5.map(col[2], 0, 255, 0.1, 0.9)
        this.grain.grainSize = p5.map(this.y, 0, 480, 0.1, this.grain.buffer.duration)
        this.grain.detune = p5.map(col[0], 0, 255, -2400, 2400)
        this.feedbackDelay.feedback.value = p5.map(val, 0, 255, 0, 0.95)
      

        p5.fill(col[0], col[1], col[2], p5.map(val, 0, 255, 150, 255))

        p5.ellipse(this.x, this.y, 24, 24);
    }

    this.urlSwitch = (index) => {
        this.grain.stop()
        this.grain = new Tone.GrainPlayer({
            "url": buffers[index].url,
            "mute": false,
            "volume": this.grainVol,
            "overlap": this.grainOverlap,
            "grainSize": this.grainSize,
            "playbackRate": this.grainPlaybackRate,
            "detune": this.grainDetune,
            "loop": true,
            "loopStart": 0,
            "loopEnd": 4,
            "reverse": false,
            "onload": () => {
            this.grain.connect(this.feedbackDelay).start()
            console.log("switched");
        }
        })
        // this.grain.stop()
        // this.grain.url = buffers[index].url
        // this.grain.onload = () => this.grain.toDestination.start()
    }

    
}


function Particle(x, y, p5){
    this.x = x;
    this.y = y;
  

    this.update = function(){
        this.x += p5.random(-10, 10);
        this.y += p5.random(-10, 10);
    }

    this.show = function(){
        p5.noStroke();
        let px = p5.floor(this.x / vScale)
        let py = p5.floor(this.y / vScale)
        let col = video.get(px, py)
        p5.fill(col[0], col[1], col[2])
        p5.ellipse(this.x, this.y, 24, 24);
    }
}



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
        for(let i = 0; i < 4; i++){
            sound_particles.push(new SoundParticle(p5.random(0, p5.width), p5.random(0, p5.height), p5.floor(p5.random(0, Object.entries(buffers).length-1)), p5))
        }
        for(let i = 0; i < 100; i++){
            particles.push(new Particle(p5.random(0, p5.width), p5.random(0, p5.height), p5))
        }
        p5.createElement('br');
        slider = p5.createSlider(0, 255, 0, 1);
        slider.style("width", "250px")
        p5.createElement('br');
        bang = p5.createButton("BANG"); 
        bang.mousePressed(this.changeSamples.bind(p5))
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
