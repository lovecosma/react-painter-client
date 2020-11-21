export default function SoundParticle(x, y, i){
    this.x = x;
    this.y = y;
    this.i = floor(i);
    this.loaded = false
    this.grainVol = 0
    this.grainOverlap = 0.05
    this.grainSize = 0.01
    this.grainPlaybackRate = 1
    this.grainDetune = 50
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
        "reverse": false
    })
    this.grain.toDestination().start()
    this.update = function(){
        this.x += random(-10, 10);
        this.y += random(-10, 10);
        if(this.x > 640){
            this.x = 0
            this.grain.reverse = !this.grain.reverse
        } else if(this.x < 0){
            this.x = 640
            this.grain.reverse = !this.grain.reverse
        }
        if(this.y > 420){
            this.y = 0
            // this.grain.playbackRate = this.grain.playbackRate * 2

        } else if(this.y < 0){
           this.y = 420
        //    this.grain.playbackRate = this.grain.playbackRate * 0.5
        }
    }

    this.show = function(){
        noStroke();
        let val = slider.value()
        let px = floor(this.x / vScale)
        let py = floor(this.y / vScale)
        let col = video.get(px, py)
        this.grain.volume.value = map(col[0], 0, 255, -30, 5)
        this.grainOverlap = map(col[2], 0, 255, 0.1, 0.9)
        this.grain.grainSize = map(col[1], 0, 255, 0.1, 0.9)
        this.grain.detune = map(col[0], 0, 255, -2400, 2400)
      

        fill(col[0], col[1], col[2], val)

        ellipse(this.x, this.y, 24, 24);
    }

    
}