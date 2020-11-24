import * as Tone from 'tone'

export default function SoundParticle(x, y, i, p5, buffers, slider, vScale, video){
        this.x = x;
        this.y = y;
        this.i = i;
        this.loaded = false
        this.sel = null
        this.grainVol = 0
        this.grainOverlap = 0.05
        this.grainSize = 0.01
        this.grainPlaybackRate = 1
        this.grainDetune = 50
        this.feedbackDelay = new Tone.FeedbackDelay(0.125, 0.5).toDestination();
        this.tremolo = new Tone.Tremolo(2, 0.75).toDestination()
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
                this.grain.connect(this.feedbackDelay, this.tremolo).start()
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
            this.grain.volume.value = p5.map(this.x, 0, 640, -10, 5)
            this.grainOverlap = p5.map(col[2], 0, 255, 0.1, 0.9)
            this.grain.grainSize = p5.map(this.y, 0, 480, 0.1, this.grain.buffer.duration)
            this.grain.detune = p5.map(col[0], 0, 255, -2400, 2400)
            this.feedbackDelay.feedback.value = p5.map(val, 0, 255, 0, 0.95)
            this.grain.playbackRate = p5.map((col[0] + col[1] + col[2])/3, 0, 255, 0.1, 2)
    
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
            }
            })
            // this.grain.stop()
            // this.grain.url = buffers[index].url
            // this.grain.onload = () => this.grain.toDestination.start()
        }
    
        
    }

