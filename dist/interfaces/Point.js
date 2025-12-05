"use strict";
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 8;
        this.color = '#3b82f6';
    }
    updatePositionwWithGravity(gravity, canvas) {
        this.y += gravity;
        this.constrainBounds(canvas);
    }
    constrainBounds(canvas) {
        this.x = Math.max(this.radius, Math.min(canvas.width - this.radius, this.x));
        this.y = Math.max(this.radius, Math.min(canvas.height - this.radius, this.y));
    }
}
