import * as Tone from 'tone'
export default function SoundParticle(x, y, p5, buffers, video, buffer){
        this.x = x;
        this.y = y;
        this.loaded = false
        this.grainVol = 0
        this.grainOverlap = 0.05
        this.grainSize = 0.01
        this.grainPlaybackRate = 1
        this.grainDetune = 50
        this.feedbackDelay = new Tone.PingPongDelay(0, 0).toDestination();
        this.tremolo = new Tone.Tremolo(2, 0.75).toDestination()
        this.grain = new Tone.GrainPlayer({
            "url": buffer,
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
            if(this.x >= 960){
                this.x = this.x - 200
                this.grain.reverse = !this.grain.reverse
            } else if(this.x <= 0){
                this.x = this.x + 200
                this.grain.reverse = !this.grain.reverse
            }
            if(this.y >= 720){
                this.y = this.y - 200
                // this.grain.playbackRate = p5. * 2
    
            } else if(this.y < 0){
               this.y = this.y + 200
            //    this.grain.playbackRate = this.grain.playbackRate * 0.5
            }
        }
    
        this.show = function(){
            p5.noStroke();
            let px = p5.floor(this.x / 8)
            let py = p5.floor(this.y / 8)
            let col = video.get(px, py)
            // this.grain.volume.value = p5.map(this.x, 0, 960, -10, 5)
            // this.grainOverlap = p5.map(col[2], 0, 255, 0, this.grain.buffer.duration)
            // this.grain.grainSize =  p5.map(val_2, 0, 255, 0.01, 1)
            // this.grain.detune = p5.map(col[0], 0, 255, -2400, 2400)
            // this.feedbackDelay.feedback.value = p5.map(val, 0, 255, 0, 0.95)
            // this.feedbackDelay.delayTime.value = p5.map(val_3, 0, 255, 0, 2)
            // this.grain.playbackRate = p5.map((col[0] + col[1] + col[2])/3, 0, 255, 0.5, 2)
            let diameter = 20
    
            p5.fill(col[0], col[1], col[2])
    
            p5.ellipse(this.x, this.y, diameter, diameter);
        }

        // this.handleSelection = e => {
        //     let i = Object.values(buffers).find(buffer => buffer.name === e.target.value)
        //     this.urlSwitch(i)
        // }

    
        // this.urlSwitch = (obj) => {
        //     this.grain.stop()
        //     this.grain = new Tone.GrainPlayer({
        //         "url": obj.url,
        //         "mute": false,
        //         "volume": this.grainVol,
        //         "overlap": this.grainOverlap,
        //         "grainSize": this.grainSize,
        //         "playbackRate": this.grainPlaybackRate,
        //         "detune": this.grainDetune,
        //         "loop": true,
        //         "loopStart": 0,
        //         "loopEnd": 4,
        //         "reverse": false,
        //         "onload": () => {
        //         this.grain.connect(this.feedbackDelay).start()
        //         this.sel.value(obj.name)
        //     }
        //     })
            // this.grain.stop()
            // this.grain.url = buffers[index].url
            // this.grain.onload = () => this.grain.toDestination.start()
        }
    
        

