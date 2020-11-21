
let video;
let vScale = 8
let buffers
let particles = [];
let sound_particles = []
let slider;

let loaded = false

function preload(){
   buffers = loadJSON("http://localhost:3001/samples");
}



function setup() {
    createCanvas(640, 480);
    pixelDensity(1)
    video = createCapture(VIDEO)
    video.size(width/vScale, height/vScale)
    for(let i = 0; i < 4; i++){
        sound_particles.push(new SoundParticle(random(0, width), random(0, height), random(0, Object.entries(buffers).length -1)))
    }
    for(let i = 0; i < 100; i++){
        particles.push(new Particle(random(0, width), random(0, height)))
    }
    slider = createSlider(0, 255, 100, 1);
    slider.position(0, 670);
    slider.style('width', '80px');
};

function draw(){
    video.loadPixels();
    for(let i = 0; i < sound_particles.length; i++){
        sound_particles[i].update();
        sound_particles[i].show();
    }
};