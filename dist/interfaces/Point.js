"use strict";
class Point {
    constructor(x, y) {
        this.radius = 8;
        this.color = '#3b82f6';
        this.velocityY = 0;
        this.x = x;
        this.y = y;
    }
    updatePositionwWithGravity(gravity, canvas) {
        this.velocityY += gravity;
        this.y += this.velocityY;
        this.constrainBounds(canvas);
    }
    constrainBounds(canvas) {
        this.x = Math.max(this.radius, Math.min(canvas.width - this.radius, this.x));
        this.y = Math.max(this.radius, Math.min(canvas.height - this.radius, this.y));
        if (this.y == canvas.height - this.radius) {
            this.velocityY = this.velocityY * -1 * 0.5; // Reverse and reduce velocity on bounce
            if (Math.abs(this.velocityY) <= 1) {
                this.velocityY = 0;
            }
        }
    }
}
