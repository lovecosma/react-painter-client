import React, { Component } from 'react'
import Sketch from "react-p5";
let video;
let vScale = 8
let buffers
let particles = [];
// let sound_particles = []
// let slider;

// let loaded = false

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
     preload = p5 => {
        buffers = p5.loadJSON("http://localhost:3001/samples");
     }

    setup = (p5, canvasParentRef) => {
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)
        p5.createCanvas(640, 480).parent(canvasParentRef);
        p5.pixelDensity(1)
        video = p5.createCapture(p5.VIDEO)
        video.size(p5.width/vScale, p5.height/vScale)
        // for(let i = 0; i < 4; i++){
        //     sound_particles.push(new SoundParticle(random(0, width), random(0, height), random(0, Object.entries(buffers).length -1)))
        // }
        for(let i = 0; i < 100; i++){
            particles.push(new Particle(p5.random(0, p5.width), p5.random(0, p5.height), p5))
        }
        // slider = p5.createSlider(0, 255, 100, 1);
        // slider.position(0, 670);
        // slider.style('width', '80px');
    };
 
    draw = (p5) => {
        video.loadPixels();
        for(let i = 0; i < particles.length; i++){
            particles[i].update();
            particles[i].show();
        }
        // NOTE: Do not use setState in the draw function or in functions that are executed
        // in the draw function...
        // please use normal variables or class properties for these purposes
    };
    render() {
        return <Sketch setup={this.setup} draw={this.draw} />;
    }
}

export default Painter
