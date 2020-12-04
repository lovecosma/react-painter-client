
export default function Particle(x, y, p5, vScale, video, slider_2){
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
        let val_2 = slider_2.value()
        let diameter = p5.map(val_2, 0, 255, 10, 50)

        p5.fill(col[0], col[1], col[2])
        p5.ellipse(this.x, this.y, diameter, diameter);
    }
}
