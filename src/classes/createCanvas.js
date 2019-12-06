export default function createCanvas(text, top) {
  const ctx = document.createElement('canvas').getContext('2d');
  // let
  ctx.canvas.width = 512;
  ctx.canvas.height = 512;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.textAlign = 'end'
  if (top) {
    ctx.fillStyle = "#000"
    // ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.font = 'bold 80px Titillium Web';
    ctx.fillStyle = "#000"
  } else {
    ctx.font = '40px Titillium Web';
    ctx.fillStyle = "#000"
  }
  ctx.fillText(text, ctx.canvas.width, ctx.canvas.height / 2);
  return ctx.canvas
}