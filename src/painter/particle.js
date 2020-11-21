import Sketch from "react-p5";

export default function Particle(x, y, p5){
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
        fill(col[0], col[1], col[2])
        ellipse(this.x, this.y, 24, 24);
    }
}