export function circle(ctx, color, x, y, r) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2*Math.PI);
    ctx.fill();
}
export function last(arr) { return arr[arr.length-1]; }
