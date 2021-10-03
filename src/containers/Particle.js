
export default function Particle(x, y, p5, video){
    this.x = x;
    this.y = y;

    this.update = function(){
        this.x += p5.random(-10, 10);
        this.y += p5.random(-10, 10);
    }

    this.show = function(){
        p5.noStroke();
        let px = p5.floor(this.x / 8)
        let py = p5.floor(this.y / 8)
        let col = video.get(px, py)
        // let val_2 = slider_2.value()
        let diameter = 20
        p5.fill(col[0], col[1], col[2])
        p5.ellipse(this.x, this.y, diameter, diameter);
    }
}
