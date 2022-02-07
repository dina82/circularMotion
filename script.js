let canvas = document.querySelector("#circle-motion")
canvas.width = window.innerWidth
canvas.height = window.innerHeight;
let canvasMotion = canvas.getContext('2d')
let mouseMove = { x: innerWidth / 2, y: innerHeight / 2 }
document.addEventListener('mousemove', function(e) {
    mouseMove.x = e.clientX
    mouseMove.y = e.clientY
})
document.addEventListener('resize', function(e) {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight;
})
class Circle {
    constructor(x, y, raduis, color) {
        this.x = x;
        this.y = y;
        this.raduis = raduis;
        this.color = color
        this.angle = 0;
        this.velocity = Math.random() * 80 + 50
        this.inc = Math.random() * .05
    }
    drawing(motion) {
        canvasMotion.beginPath()
        canvasMotion.arc(motion.x, motion.y, this.raduis, 0, Math.PI * 2)
        canvasMotion.strokeStyle = this.color
        canvasMotion.stroke()
    }
    move() {
        let motion = { x: this.x, y: this.y }
        this.drawing(motion)
        this.angle += this.inc
        this.x = mouseMove.x + this.velocity * Math.cos(this.angle)
        this.y = mouseMove.y + this.velocity * Math.sin(this.angle)
    }
}
let arr = []
let colors = ["#00bdff", "#4d39ce", "#088eff"]
for (let i = 0; i < 150; i++) {
    let circleColor = Math.floor(Math.random() * colors.length)
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let circle = new Circle(x, y, 2, colors[circleColor])
    arr.push(circle)
}

function animation() {
    requestAnimationFrame(animation)
    canvasMotion.fillRect(0, 0, canvas.width, canvas.height);
    canvasMotion.fillStyle = 'rgba(255, 255, 255, .05)'
    arr.forEach(element => {
        element.move()
    });
}
animation()