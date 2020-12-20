const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const w = parseInt(canvas.width)
const h = parseInt(canvas.height)

function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect()
  let x = event.clientX - rect.left
  let y = event.clientY - rect.top

  const t = ctx.getTransform()

  // Adjust for translate (moving)
  x = x - t.e
  y = y - t.f

  // Adjust for scaling
  x = x * t.a
  y = y * t.d

  // TODO: adjust for skewing (with trig) I'm not using skewing yet though.

  const newEvent = new CustomEvent('canvasclicked', {detail: {x: x, y: y}})
  canvas.dispatchEvent(newEvent)
}

function setup() {
  canvas.addEventListener('mousedown', (e) => {
    getCursorPosition(canvas, e)
  })

  canvas.addEventListener('canvasclicked', (e) => {
    const {x, y} = e.detail
    mouseClicked(x, y)
  })
}


const radius = 30
const speed = 3

let balls = []

function rand(high, low) {
  return (Math.abs(high) + Math.abs(low))*Math.random() - low
}

function mouseClicked(x, y) {
  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i];
    if (Math.sqrt((ball.x-x)**2 + (ball.y-y)**2) < radius) {
      balls.splice(i, 1)
      return
    }
  }

  balls.push({x: x, y: y, yv: rand(speed, -speed), xv: rand(speed,-speed), color: '#000'})
}

function distance(b1, b2) {
  return Math.sqrt((b1.x-b2.x)**2 + (b1.y-b2.y)**2)
}

function intersecting(b1, b2) {
  return distance(b1,b2) < radius*2
}

// unit delta to apply to b1, to make it go away from b2
function delta(b1, b2) {
  let v = [b1.x - b2.x, b1.y - b2.y]
  let m = Math.sqrt(v[0]**2 + v[1]**2)
  v[0] /= m
  v[1] /= m

  return v
}

ctx.font = 'bold 48px serif'


function draw(_timestamp) {
  // ctx.clearRect(0,0,w,h)
  // Commet effect
  ctx.fillStyle = 'rgba(200,200,200,0.4)'
  ctx.fillRect(0, 0, w, h)

  // ctx.fillRect(x, y, radius, radius)
  for (let ball of balls) {
    ball.x += ball.xv
    ball.y += ball.yv
    const x = ball.x; const y = ball.y;

    if (x > w-radius) { ball.xv = -speed + rand(1, -1) }
    if (y > h-radius) { ball.yv = -speed + rand(1, -1) }

    if (x < radius) { ball.xv = speed + rand(1, -1) }
    if (y < radius) { ball.yv = speed + rand(1, -1) }

    // check agienst other balls.
    let hit = false;
    for (let b2 of balls) {
      if (b2 !== ball && intersecting(ball, b2)) {
        hit = true;
        const [dx, dy] = delta(ball, b2)
        ball.xv = speed*dx
        ball.yv = speed*dy
      }
    }
    ball.color = hit ? '#f00' : '#000'
  }

  for (let ball of balls) {
    ctx.beginPath()
    ctx.fillStyle = ball.color
    ctx.ellipse(ball.x, ball.y, radius, radius, 0, 0, 2*Math.PI)
    ctx.fill()
    ctx.stroke()

    // for (let b of balls) {
    //   if (distance(b, ball) < radius*8) {
    //     ctx.beginPath()
    //     ctx.moveTo(ball.x, ball.y)
    //     ctx.lineTo(b.x, b.y)
    //     ctx.stroke()
    //   }
    // }
  }

  window.requestAnimationFrame(draw)
}

// for testing
for (let i = 1; i < 10; i++) {
  mouseClicked(radius*i, radius*i)
}

setup()
window.requestAnimationFrame(draw)
