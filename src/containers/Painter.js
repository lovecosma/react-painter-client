import React, { Component, createElement } from 'react'
import Sketch from "react-p5";
import * as Tone from 'tone'
import Particle from './Particle'
import SoundParticle from './SoundParticle'
import Modal from './Modal'

let video;
let vScale = 8
let buffers
let bang
let particles = [];
let sound_particles = []
let slider;
let slider_2
let slider_3
let numberOfParticles = 0
let sel_1;
let sel_2;
let sel_3;
let sel_4;
let selects = [];
let sampleSelect;
let p5_lib;
let menu
let h1

export class Painter extends Component {
    state = {
        playing: false,
    }
     preload = p5 => {
        buffers = p5.loadJSON("http://localhost:3001/samples");
        p5_lib = p5
     }

     play = async () => {
        this.setState({playing: true})
        await Tone.start()
        console.log('audio is ready')
    }

    createSelectionMenu = p5 => {
        sel_1 = p5.createSelect();
        sel_2 = p5.createSelect();
        sel_3 = p5.createSelect();
        sel_4 = p5.createSelect();
        selects.push(sel_1, sel_2, sel_3, sel_4)
        for(let s of selects){
            let div = p5.createDiv()
            div.style("display", "inline-flex")
            div.style("flex", "left")
            div.style("width", "25%")
            div.style("overflow", "auto") 
            div.style("padding", "15px")   
            s.style("display", "block") 
            for(let b of Object.entries(buffers)){
                s.option(b[1].name)
            }
            div.class("center")
            sampleSelect.child(div)
            div.child(s)
        }
    }

    setup = (p5, canvasParentRef) => {
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)
        p5.createCanvas(960, 720).parent(canvasParentRef);
        p5.pixelDensity(1)
        p5.background("WhiteSmoke")
        p5.createElement('br')
        menu = p5.createDiv()
        menu.class("center container black white-text")
        h1 = p5.createElement('h5', "Canvas Options")
        h1.class("white-text")
        menu.style("padding", "20px")
        menu.style("margin-top", "20px")
        video = p5.createCapture(p5.VIDEO)
        video.size(p5.width/vScale, p5.height/vScale)
        sampleSelect = p5.createDiv()
        sampleSelect.class("center container")
        sampleSelect.style("width", "100%")
        slider = p5.createSlider(0, 255, 0, 1);
        slider.style("width", "500px")
        // p5.createElement('br');
        slider_2 = p5.createSlider(0, 255, 100, 1);
        slider_2.style("width", "500px")
        p5.createElement('br');
        slider_3 = p5.createSlider(0, 255, 0, 1);
        slider_3.style("width", "500px")
        p5.createElement('br');
        p5.createElement('br');
        bang = p5.createButton("BANG"); 
        bang.class("black white-text large")
        bang.mousePressed(this.changeSamples.bind(p5))
        menu.child(video)
        menu.child(h1)
        menu.child(p5.createElement('br'))
        menu.child(sampleSelect)
        menu.child(p5.createElement('br'))
        menu.child(slider)
        menu.child(p5.createElement('br'))
        menu.child(slider_2)
        menu.child(p5.createElement('br'))
        menu.child(slider_3)
        menu.child(p5.createElement('br'))
        menu.child(bang)
        menu.child(p5.createElement('br'))
        this.createSelectionMenu(p5);
        for(let i = 0; i < selects.length; i++){
            sound_particles.push(new SoundParticle(p5.random(0, p5.width), p5.random(0, p5.height), p5.floor(p5.random(0, Object.entries(buffers).length-1)), p5, buffers, slider, vScale, video, selects[i], slider_2, slider_3))
            sound_particles[i].sel.changed(sound_particles[i].handleSelection)
        }

        for(let i = 0; i < 100; i++){
            particles.push(new Particle(p5.random(0, p5.width), p5.random(0, p5.height), p5, vScale, video, slider_2))
        }
    };

    stop = () => {
        for(let i = 0; i < sound_particles.length; i++){
            sound_particles[i].grain.stop()
        } 
        for(let i = 0; i < selects.length; i++){
        }
    }
    
    changeSamples(){
        for(let i = 0; i < sound_particles.length; i++){
            let y = this.floor(this.random(0, Object.entries(buffers).length-1))
            sound_particles[i].urlSwitch(buffers[y]);
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
    componentWillUnmount = () => {
        this.stop()
    }

    render() {
        if(this.state.playing){
            return (
                <div className="sketch center">
                    <Sketch preload={this.preload} setup={this.setup} draw={this.draw} />
                    <Modal/>
                </div>
            )
        } else {
            return (
                <div className="play-button center">
                    <button onClick={this.play} className="btn-floating btn-large waves-effect waves-light black valign-wrapper">PLAY</button>
                </div> 
            )
        }
    }
}

export default Painter
