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

function rand(high, low) {
  return (Math.abs(high) + Math.abs(low)) * Math.random() - low
}

const radius = 30
const speed = 3

let balls = []

function Ball(x, y) {
  return {
    x: x,
    y: y,

    xv: rand(speed, -speed),
    yv: rand(speed, -speed),
    color: '#000'
  }
}

function distance(b1, b2) {
  return Math.sqrt((b1.x - b2.x) ** 2 + (b1.y - b2.y) ** 2)
}

function intersecting(b1, b2) {
  return distance(b1, b2) < radius * 2
}

function deleteBall(i) {
  balls.splice(i, 1)
}

// unit delta to apply to b1, to make it go away from b2
function delta(b1, b2) {
  let d = {x: b1.x - b2.x, y: b1.y - b2.y}
  let m = Math.sqrt(d.x ** 2 + d.y ** 2)

  // normalize vectors
  d.x /= m
  d.y /= m

  return d
}

function handleEdges(b) {
  if (b.x > w - radius) {b.xv = -speed}
  if (b.y > h - radius) {b.yv = -speed}

  if (b.x < radius) {b.xv = speed}
  if (b.y < radius) {b.yv = speed}
}

ctx.font = 'bold 48px serif'

function mouseClicked(x, y) {
  const b1 = {x: x, y: y}

  for (let i = 0; i < balls.length; i++) {
    const b2 = balls[i];
    if (distance(b1, b2) < radius) {
      deleteBall(i)
      return // we deleted a ball, so we don't create a new one
    }
  }

  balls.push(Ball(x, y))
}

function draw(_timestamp) {
  // ctx.clearRect(0,0,w,h)
  // Commet effect
  ctx.fillStyle = 'rgba(200,200,200,0.4)'
  ctx.fillRect(0, 0, w, h)

  for (let ball of balls) {
    // take the small step according to velocity
    ball.x += ball.xv
    ball.y += ball.yv

    // adjust velocity if you hit the sides or top
    handleEdges(ball)

    // check agienst other balls.
    let hit = false;
    for (let b2 of balls) {
      if (b2 !== ball && intersecting(ball, b2)) {
        hit = true;
        const d = delta(ball, b2)
        ball.xv = speed * d.x
        ball.yv = speed * d.y
      }
    }
    ball.color = hit ? '#f00' : '#000'
  }

  for (let ball of balls) {
    // Draw the balls! note we've already changed color above, when we
    // checked for collisions
    ctx.beginPath()
    ctx.fillStyle = ball.color
    ctx.ellipse(ball.x, ball.y, radius, radius, 0, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()

    // Draw lines between close balls
    // for (let b of balls) {
    //   if (distance(b, ball) < radius * 8) {
    //     ctx.beginPath()
    //     ctx.moveTo(ball.x, ball.y)
    //     ctx.lineTo(b.x, b.y)
    //     ctx.stroke()
    //   }
    // }
  }

  window.requestAnimationFrame(draw)
}

setup()
window.requestAnimationFrame(draw)
