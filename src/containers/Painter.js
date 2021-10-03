import React, {useState } from 'react'
import Sketch from "react-p5";
import * as Tone from 'tone'
import SoundParticle from './SoundParticle'
import Modal from './Modal'
import PainterUI from "../components/PainterUI"
import "../stylesheets/Painter.css"
import Particle from "./Particle"


const Painter = ({samples}) => {


    const knobs = {"Feedback": "", "Delay Time": "", "Dry/Wet": ""};
    let urls = samples.map((sample) => sample.url)
    const handleChange = (e) => {
       knobs[e.target.name] = e.target.value
       console.log(knobs[e.target.name]);
    }
    let videoFeed;
    let buffers;
    let particles = [];
    let numberOfParticles = 10;
    let sound_particles = [];
    const [playing, setPlaying] = useState(false)

    const preload = (p5) => {
        buffers = new Tone.ToneAudioBuffers(urls, () => {
            console.log("buffers loaded");
        })
    }


    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(800, 720).parent(canvasParentRef);
        p5.background("WhiteSmoke")
        videoFeed = p5.createCapture(p5.VIDEO)
        videoFeed.hide()
        for(let i = 0; i < numberOfParticles; i++){
            particles.push(new Particle(p5.random(0, p5.width), p5.random(0, p5.height), p5, videoFeed))
        }
        for(let i = 0; i < 4; i++){
            sound_particles.push(new SoundParticle(p5.random(0, p5.width), p5.random(0, p5.height), p5, urls, videoFeed, urls[i]))
            console.log(buffers[i]);
            // sound_particles[i].sel.changed(sound_particles[i].handleSelection)
        }
    }

    const draw = (p5) => {
         // video.loadPixels();
         // let val = slider.value()
         for(let i = 0; i < 6; i++){
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
    if(playing){
        return (
            <div className="sketch center">
                <div id="painter-container">
                    <div className="sketch-container">
                        <Sketch preload={preload} setup={setup} draw={draw}/>
                    </div>
                   <PainterUI handleChange={handleChange}/>
                </div>
                <Modal/>
            </div>
        )
    } else {
        return (
            <div className="play-button center">
                <div>
                    <h3>Make sure your sound isn't too loud..</h3>
                </div>
                <button onClick={async () => {
                            setPlaying(!playing)
                            await Tone.start()
                            console.log('audio is ready')
                        }} className="btn-floating btn-large waves-effect waves-light black valign-wrapper">PLAY</button>
            </div> 
        )
    }

} 

export default Painter




// let video;
// let buffers
// let bang
// let particles = [];
// let sound_particles = []
// let slider;
// let slider_2
// let slider_3
// let numberOfParticles = 0
// let sel_1;
// let sel_2;
// let sel_3;
// let sel_4;
// let selects = [];
// let sampleSelect;
// let p5_lib;
// let menu;
// let h1;
// let snapshot;
// let snap_div;
// let cnv;

// export class Painter extends Component {
//     state = {
//         playing: false,
//     }

    //  play = async () => {
    //     this.setState({playing: true})
    //     await Tone.start()
    //     console.log('audio is ready')
    // }

//     createSelectionMenu = p5 => {
//         sel_1 = p5.createSelect();
//         sel_2 = p5.createSelect();
//         sel_3 = p5.createSelect();
//         sel_4 = p5.createSelect();
//         selects.push(sel_1, sel_2, sel_3, sel_4)
//         for(let s of selects){
//             let div = p5.createDiv()
//             div.style("display", "inline-flex")
//             div.style("flex", "left")
//             div.style("width", "25%")
//             div.style("overflow", "auto") 
//             div.style("padding", "15px")   
//             s.style("display", "block") 
//             for(let b of Object.entries(buffers)){
//                 s.option(b[1].name)
//             }
//             div.class("center")
//             sampleSelect.child(div)
//             div.child(s)
//         }
//     }

//     setup = (p5, canvasParentRef) => {
//         // use parent to render the canvas in this ref
//         // (without that p5 will render the canvas outside of your component)
//         cnv = p5.createCanvas(960, 720).parent(canvasParentRef);
//         p5.pixelDensity(1)
//         p5.background("WhiteSmoke")
//         snapshot = p5.createElement('button', 'Save Canvas')
//         snapshot.class("black white-text large")
//         p5.createElement('br')
//         snap_div = p5.createDiv()
//         menu = p5.createDiv()
//         snap_div.class("center container white-text")
//         snap_div.child(snapshot)
//         snapshot.mousePressed(this.snapshot.bind(p5))
//         menu.class("center container black white-text")
//         h1 = p5.createElement('h5', "Canvas Options")
//         h1.class("white-text")
//         menu.style("padding", "20px")
//         menu.style("margin-top", "20px")
//         menu.style( "border-radius", "25px")
//         video = p5.createCapture(p5.VIDEO)
//         video.style("border", "solid white")
//         video.size(p5.width/vScale, p5.height/vScale)
//         sampleSelect = p5.createDiv()
//         sampleSelect.class("center container")
//         sampleSelect.style("width", "100%")
//         slider = p5.createSlider(0, 255, 0, 1);
//         slider.style("width", "500px")
//         // p5.createElement('br');
//         slider_2 = p5.createSlider(0, 255, 100, 1);
//         slider_2.style("width", "500px")
//         p5.createElement('br');
//         slider_3 = p5.createSlider(0, 255, 0, 1);
//         slider_3.style("width", "500px")
//         p5.createElement('br');
//         p5.createElement('br');
//         bang = p5.createButton("BANG"); 
//         bang.class("black white-text large")
//         bang.mousePressed(this.changeSamples.bind(p5))
//         menu.child(p5.createElement('br'))
//         menu.child(p5.createElement('br'))
//         menu.child(video)
//         menu.child(h1)
//         menu.child(p5.createElement('br'))
//         menu.child(sampleSelect)
//         menu.child(p5.createElement('br'))
//         menu.child(slider)
//         menu.child(p5.createElement('br'))
//         menu.child(slider_2)
//         menu.child(p5.createElement('br'))
//         menu.child(slider_3)
//         menu.child(p5.createElement('br'))
//         menu.child(bang)
//         menu.child(p5.createElement('br'))
//         this.createSelectionMenu(p5);
//         for(let i = 0; i < selects.length; i++){
//             sound_particles.push(new SoundParticle(p5.random(0, p5.width), p5.random(0, p5.height), p5.floor(p5.random(0, Object.entries(buffers).length-1)), p5, buffers, slider, vScale, video, selects[i], slider_2, slider_3))
//             sound_particles[i].sel.changed(sound_particles[i].handleSelection)
//         }

//         for(let i = 0; i < 100; i++){
//             particles.push(new Particle(p5.random(0, p5.width), p5.random(0, p5.height), p5, vScale, video, slider_2))
//         }
//     };

//     snapshot(){
//         this.save(cnv, 'myPortraitFromPainter.jpg')
//     }

//     stop = () => {
//         for(let i = 0; i < sound_particles.length; i++){
//             sound_particles[i].grain.stop()
//         } 
//         for(let i = 0; i < selects.length; i++){
//         }
//     }
    
//     changeSamples(){
//         for(let i = 0; i < sound_particles.length; i++){
//             let y = this.floor(this.random(0, Object.entries(buffers).length-1))
//             sound_particles[i].urlSwitch(buffers[y]);
//         } 
//     }

  
//     componentWillUnmount = () => {
//         this.stop()
//     }

//     render() {
//         if(this.state.playing){
//             return (
                // <div className="sketch center">
                //     <Sketch preload={this.preload} setup={this.setup} draw={this.draw} />
                //     <Modal/>
                // </div>
//             )
//         } else {
//             return (
                // <div className="play-button center">
                //     <div>
                //         <h3>Make sure your sound isn't too loud..</h3>
                //     </div>
                //     <button onClick={this.play} className="btn-floating btn-large waves-effect waves-light black valign-wrapper">PLAY</button>
                // </div> 
//             )
//         }
//     }
// }

// export default Painter
